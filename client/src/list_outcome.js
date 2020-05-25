import React, { Component } from 'react';
import { createSorter } from './components/sort';
import { createFilter } from './components/filter';
import TableDisplay from './components/tabledisplay';


class ListOutcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sorters: [{
                property: 'maand',
                direction: 'ASC'
            }, {
                property: 'invordering',
                direction: 'DESC'
            }]
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
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
            //data: null,
            filters: [{
                property: 'beslaglegger',
                value: event.target.value
            }]
        });
        this.getData();
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
                    <select class="ui selection dropdown" onChange={this.handleChange}>
                            <option value="">Geen</option>
                            <option value="SNS Bank">SNS Bank</option>
                            <option value="Hakrinkbank">Hakrinkbank</option>
                            <option value="Wehkamp">Wehkamp</option>
                            <option value="DUO">DUO</option>
                            <option value="Belastingdienst">Belastingdienst</option>
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