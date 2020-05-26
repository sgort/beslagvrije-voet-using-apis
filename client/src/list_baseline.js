import React, { Component } from 'react';
import { createSorter } from './components/sort';
import { createFilter } from './components/filter';
import TableDisplay from './components/tabledisplay';

class ListBaseline extends Component {
    state = {
        filters: this.props.filters,
        sorters: this.props.sorters,
    };

    
    static defaultProps = {
        filters: [{
            property: 'BSN',
            value: '999993483'
        }],
        sorters: [{
            property: 'maand'
        }]
    };

    componentDidMount() {
        fetch('http://localhost:9000/invorderingen/base-records')
            .then(res => res.json())
            .then(this.onLoad);
    }

    parseData(data) {
        const { sorters } = this.state;

        if (data && data.length) {
            if (Array.isArray(sorters) && sorters.length) {
                data.sort(createSorter(...sorters));
            }
        }

        return data;
    }

    onLoad = data => {
        this.setState({
            data: this.parseData(data.invorderingen)
        });
    };

    render() {
        const { data } = this.state;
        return data ? this.renderData(data) : this.renderLoading();
    }

    renderData(data) {
        if (data && data.length > 0) {
            const { filters } = this.state;

            if (Array.isArray(filters) && filters.length) {
                data = data.filter(createFilter(...filters));
            }
            return (
                <div className="Status">
                    <p className="Status invorderingen">Status invordering(en): </p>
                    <TableDisplay data={data}/>
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

export default ListBaseline;