import React, { Component } from 'react';
import { createSorter } from './components/sort';
import { createFilter } from './components/filter';
import TableDisplay from './components/tabledisplay';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";


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
            startDate: new Date('2018-01')
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const query = `
        query {
            invorderingen {
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

    /**
    * Notice: data.data.invorderingen, ie the GraphQL API JSON array
    */
    onLoad = data => {
        this.setState({
            data: this.parseData(data.data.invorderingen)
        });
    };

    handleChange = date => {
        this.setState({
            startDate: date
        });
        const localDate = date.toLocaleDateString("nl", { year: 'numeric', month: '2-digit' })
        this.filterList(localDate.substring(3, 7) + '-' + localDate.substring(0, 2))
    };

    filterList(selectedMonth) {
        this.setState({
            data: null, // can't fix persistent problem with filtering, this bad solution then
            filters: [{
                property: 'maand',
                value: selectedMonth
            }],
        });
        this.componentDidMount();
    }

    render() {
        const { data } = this.state;
        return data ? this.renderData(data) : this.renderLoading();
    }

    renderData(data) {
        if (data && data.length > 0) {
            return (
                <div className="Filter">
                    <p className="Filter">Status invordering(en):
                    <DatePicker
                            selected={this.state.startDate}
                            onChange={this.handleChange}
                            dateFormat="yyyy-MM"
                            showMonthYearPicker
                            inline
                        />
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