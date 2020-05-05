import React, { Component } from 'react';
import { createSorter } from './components/sort';
import { createFilter } from './components/filter';

class List extends Component {
    state = {
        filters: this.props.filters,
        sorters: this.props.sorters
    };

    static defaultProps = {
        filters: [{
            property: 'BSN',
            value: '999994669'
        }],
        sorters: [{
            property: 'beslaglegger'
        }, {
            property: 'openstaande_vordering',
            direction: 'DESC'
        }]
    };

    componentDidMount() {
        fetch('http://localhost:9000/invorderingen')
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
                    <p>BSN | beslaglegger | beslag oject | beslagvrije voet | openstaande vordering | invordering</p>
                    {data.map(item => (
                        <div key={item.id}>
                            <p>{item.BSN} | {item.beslaglegger} | {item.beslag_object} | € {item.beslagvrije_voet} | € {item.openstaande_vordering} | € {item.invordering}</p>
                        </div>
                    ))}
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

export default List;