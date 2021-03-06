import React, { Component } from 'react';
import { createSorter } from './components/sort';
import { createFilter } from './components/filter';
import TableDisplay from './components/tabledisplay';


class ListOutcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filters: [{
                property: 'beslaglegger',
                value: 'SNS Bank'
            }],
            sorters: [{
                property: 'maand',
                direction: 'ASC'
            }, {
                property: 'invordering',
                direction: 'DESC'
            }],
            dropdownvalue: 'SNS Bank'
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
                property: 'beslaglegger',
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
                            <option value="SNS Bank">SNS Bank</option>
                            <option value="Hakrinkbank">Hakrinkbank</option>
                            <option value="Wehkamp">Wehkamp</option>
                            <option value="DUO">DUO</option>
                            <option value="Belastingdienst">Belastingdienst</option>
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

export default ListOutcome;