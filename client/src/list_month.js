import React, { Component } from 'react';
import { createSorter } from './components/sort';
import { createFilter } from './components/filter';
import TableDisplay from './components/tabledisplay';


class ListMonth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: [{
                property: 'maand',
                value: '2018-01'
            }],
            sorters: [{
                property: 'maand',
                direction: 'ASC'
            }, {
                property: 'invordering',
                direction: 'DESC'
            }],
            dropdownvalue: '2018-01'
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:9000/invorderingen')
            .then(res => res.json())
            .then(this.onLoad);
    }

    parseData(data) {
        const { sorters } = this.state;
        const { filters } = this.state;

        if (data && data.length) {
            if (Array.isArray(sorters) && sorters.length) {
                data.sort(createSorter(...sorters));
            }
            if (Array.isArray(filters) && filters.length) {
                data = data.filter(createFilter(...filters));
            }
        }

        return data;
    }

    onLoad = data => {
        this.setState({
            data: this.parseData(data.invorderingen)
        });
    };

    handleChange(event) {
        this.setState({
            data: null, // can't fix persistent problem with filtering, this bad solution then
            filters: [{
                property: 'maand',
                value: event.target.value
            }],
            dropdownvalue: event.target.value
        });
        this.componentDidMount();
    };

    render() {
        const { data } = this.state;
        return data ? this.renderData(data) : this.renderLoading();
    }

    renderData(data) {
        if (data && data.length > 0) {
            return (
                <div className="Filter">
                    <p className="Filter">Status invordering(en):
                    <select class="ui selection dropdown" value={this.state.dropdownvalue} onChange={this.handleChange}>
                            <option value="2018-01">jan</option>
                            <option value="2018-02">feb</option>
                            <option value="2018-03">mar</option>
                            <option value="2018-04">apr</option>
                            <option value="2018-05">mei</option>
                            <option value="2018-06">jun</option>
                            <option value="2018-07">jul</option>
                            <option value="2018-08">aug</option>
                            <option value="2018-09">sep</option>
                            <option value="2018-10">okt</option>
                            <option value="2018-11">nov</option>
                            <option value="2018-12">dec</option>
                            <option value="">Geen</option>
                        </select>
                    </p>
                    <TableDisplay data={data} />
                </div>
            );
        } else {
            return <div>No items found</div>;
        }
    }

    renderLoading() {
        return <div>Fetching records...</div>;
    }
}

export default ListMonth;