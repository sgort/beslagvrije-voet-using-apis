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
            property: 'beslaglegger'
        }]
    };


    componentDidMount() {
        const query = `
        query {
            invorderingen_base_records {
              maand BSN
              beslag_object
              beslaglegger
              openstaande_vordering
              beslagvrije_voet
              afloscapaciteit
              invordering
            }
          }
          `;

        const url = "http://localhost:4000/graphql";

        const opts = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query })
        };

        fetch(url, opts)
            .then(res => res.json())
            .then(this.onLoad);
    }

    /**
     * Original REST API 
     *
   componentDidMount() {
    fetch('http://localhost:9000/invorderingen/base-records')
        .then(res => res.json())
        .then(this.onLoad);
    }
    */

    parseData(data) {
        const { sorters } = this.state;

        if (data && data.length) {
            if (Array.isArray(sorters) && sorters.length) {
                data.sort(createSorter(...sorters));
            }
        }

        return data;
    }

    /**
     * Notice: data.data.invorderingen_base_records, ie the GraphQL API JSON array
     */
    onLoad = data => {
        this.setState({
            data: this.parseData(data.data.invorderingen_base_records)
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

export default ListBaseline;