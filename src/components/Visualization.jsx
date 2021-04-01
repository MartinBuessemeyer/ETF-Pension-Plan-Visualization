import React from 'react';
import {
    STARTING_CAPITAL_IDENTIFIER,
    MONTHLY_INVESTMENT_IDENTIFIER,
    TRANSACTION_COSTS_IDENTIFIER,
    TRANSACTION_COSTS_TYPE_IDENTIFIER,
    SAVING_PHASE_IDENTIFIER,
    AGE_IDENTIFIER,
    TAX_FREE_AMOUNT_IDENTIFIER,
    MONTHLY_PAYOUT_IDENTIFIER,
    LIFE_EXPECTATION_IDENTIFIER,
    DETAILED_GRAPH_DROPDOWN_IDENTIFIER,
} from './App';
import { InvestmentModel } from '../model/InvestmentModel';
import LineChartD3 from '../renderer/LineChartD3';
import CashflowBarChart from '../renderer/CashflowBarChartD3';
import { D3ChartStrategy } from '../renderer/D3ChartStrategy';

function generateCostConfig(state) {
    if (state[TRANSACTION_COSTS_TYPE_IDENTIFIER]) {
        return { percentageCosts: 0.0, fixedCosts: state[TRANSACTION_COSTS_IDENTIFIER] };
    } else {
        return { percentageCosts: state[TRANSACTION_COSTS_IDENTIFIER], fixedCosts: 0.0 };
    }
}

export class Visualization extends React.Component {
    constructor(props) {
        super(props);

        this.firstSVGRef = React.createRef();
        this.secondSVGRef = React.createRef();
    }

    getInvestmentModel() {
        const etfIdentifierToRatio = {};
        for (const etfIdentifier in this.props.etfProperties) {
            if (this.props.etfProperties[etfIdentifier].selected) {
                etfIdentifierToRatio[this.props.etfProperties[etfIdentifier].symbol] = this.props.etfProperties[
                    etfIdentifier
                ].percentage;
            }
        }

        return new InvestmentModel(
            this.props[STARTING_CAPITAL_IDENTIFIER],
            this.props[MONTHLY_INVESTMENT_IDENTIFIER],
            this.props[MONTHLY_PAYOUT_IDENTIFIER],
            this.props[SAVING_PHASE_IDENTIFIER],
            etfIdentifierToRatio,
            {
                taxFreeAmount: this.props[TAX_FREE_AMOUNT_IDENTIFIER],
                costConfig: generateCostConfig(this.props),
            },
            this.props[AGE_IDENTIFIER],
            this.props[LIFE_EXPECTATION_IDENTIFIER]
        );
    }

    drawVisualization() {
        D3ChartStrategy.reset();
        try {
            if (this.props.isValid != null && this.props.isValid) {
                this.investmentModel = this.getInvestmentModel();
            }
            const firstPayoutPhaseDate = this.investmentModel.payoutDates[0];
            const correctLevelOfDetailInvestmentSteps = this.investmentModel.getInvestmentSteps(
                this.props[DETAILED_GRAPH_DROPDOWN_IDENTIFIER]
            );
            new LineChartD3(
                correctLevelOfDetailInvestmentSteps,
                this.firstSVGRef.current,
                firstPayoutPhaseDate
            ).render();
            new CashflowBarChart(
                correctLevelOfDetailInvestmentSteps,
                this.secondSVGRef.current,
                firstPayoutPhaseDate
            ).render();
        } catch (e) {
            console.error(e);
        }
    }

    async componentDidMount() {
        this.drawVisualization();
    }

    componentDidUpdate() {
        this.drawVisualization();
    }
    render() {
        return (
            <React.Fragment>
                <div ref={this.secondSVGRef}></div>
                <div ref={this.firstSVGRef}></div>
            </React.Fragment>
        );
    }
}

export default Visualization;
