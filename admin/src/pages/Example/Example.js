import React, { Component } from 'react'
import Layout from "../../containers/Layout/Layout"

import Spinner from "../../components/Spinner/Spinner"
import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_RATES = gql`
    {
        rates(currency: "USD") {
        currency
        rate
        }
    }
`

export class ExamplePage extends Component {
    render() {
        return (
            <Layout title="Ejemplo">
                <div className="example">
                    <h1>This is an example of how to make a quey with apollo + graphql</h1>
                    <Query query={GET_RATES}>
                        {({ loading, error, data }) => {
                            if (loading) return <Spinner />;
                            if (error) return <p>Error :(</p>;

                            return data.rates.map(({ currency, rate }) => (
                                <div key={currency}>
                                    <p>{currency}: {rate}</p>
                                </div>
                            ));
                        }}
                    </Query>
                </div>
            </Layout>
        )
    }
}

export default ExamplePage
