import * as d3 from 'd3';
import { ETFRatio, InvestmentStep, sumOfTotalValues } from '../model/InvestmentModel';
import { DataArrayEntry } from './D3ChartStrategy';
import { AreaChartD3 } from './AreaChartD3';

/**
 * A class that draws an area chart that contains the value of costs, taxes,
 * inflation and the total value and invested value of all used ETFs.
 */
export class ConfidenceChartD3 extends AreaChartD3 {
    protected readonly contentOpacity: number = 0.65 / 2;
    protected readonly confidenceAreaOpacity: number = 0.65;

    private readonly confidenceColors = {
        minimumLine: '#ff3e58',
        maximumLine: '#00e396',
        middleLine: this.totalColor,
        area: '#a6d8fe',
    };
    private minInvestmentSteps: InvestmentStep[];
    private maxInvestmentSteps: InvestmentStep[];

    /**
     * Constructs the area chart by calling the base class constructor and determining all used ETFs.
     */
    constructor(
        investmentSteps: InvestmentStep[],
        minInvestmentSteps: InvestmentStep[],
        maxInvestmentSteps: InvestmentStep[],
        renderDivRef: HTMLDivElement,
        payoutPhaseStartDate: Date,
        tooltipDate: Date | undefined,
        yExtent: [number, number] | undefined,
        etfRatio: ETFRatio,
        subtractInflationFromTotal: boolean,
        previousInvestmentSteps: InvestmentStep[] | undefined
    ) {
        super(
            investmentSteps,
            renderDivRef,
            payoutPhaseStartDate,
            tooltipDate,
            yExtent,
            etfRatio,
            subtractInflationFromTotal,
            previousInvestmentSteps
        );
        this.minInvestmentSteps = minInvestmentSteps;
        this.maxInvestmentSteps = maxInvestmentSteps;
        this.subtractInflationFromTotal = subtractInflationFromTotal;
    }

    /**
     * Prepares all data from the investment model for rendering.
     */
    protected _prepareData() {
        super._prepareData();
        let idx = Math.max(...Object.values(this.dataToIndex));
        this.dataToIndex = {
            areaConfidence: ++idx,
        };

        this.maxIndex = this.dataToIndex.areaConfidence;

        this.dataArray.push([]);
        for (let i = 0; i < this.investmentSteps.length; i++) {
            this.dataArray[this.dataToIndex.areaConfidence].push({
                yStart:
                    sumOfTotalValues(this.minInvestmentSteps[i]) -
                    (this.subtractInflationFromTotal ? this.minInvestmentSteps[i].inflation : 0),
                yEnd:
                    sumOfTotalValues(this.maxInvestmentSteps[i]) -
                    (this.subtractInflationFromTotal ? this.maxInvestmentSteps[i].inflation : 0),
                date: this.investmentSteps[i].date,
                color: this.confidenceColors.area,
            });
        }
    }

    /**
     * Draws all lines of the chart. I.e. the middle line.
     */
    protected _drawLines() {
        super._drawLines();
        const lineDataArray = [
            this.dataArray[this.dataToIndex.areaConfidence],
            this.dataArray[this.dataToIndex.areaConfidence],
        ];
        const lookupIdentifier: ('yStart' | 'yEnd')[] = ['yStart', 'yEnd', 'yStart'];
        const confidenceColors = [this.confidenceColors.minimumLine, this.confidenceColors.maximumLine];
        for (let i = 0; i < lineDataArray.length; i++) {
            this.svg
                .append('path')
                .datum(lineDataArray[i])
                .style('stroke', confidenceColors[i])
                .style('stroke-width', this.lineStrokeWidth)
                .style('fill', 'none')
                .attr(
                    'd',
                    d3
                        .line<DataArrayEntry>()
                        .x(d => this.xScale(d.date))
                        .y((_, j) => {
                            return this.yScale(lineDataArray[i][j][lookupIdentifier[i]]);
                        })
                );
        }
    }

    /**
     * Draws the main content of the diagram. Currently a stacked area chart.
     */
    protected _drawContent() {
        this._drawArea();
        this._drawLines();
    }

    /**
     * Draws the stacked areas of the diagram.
     */
    protected _drawArea() {
        super._drawArea();
        // Draw stacked area chart.
        this.svg
            .append('g')
            .attr('class', 'area')
            .append('path')
            .datum(this.dataArray[this.dataToIndex.areaConfidence])
            .style('opacity', this.confidenceAreaOpacity)
            .style('fill', d => d[0].color)
            .attr(
                'd',
                d3
                    .area<DataArrayEntry>()
                    .curve(d3.curveMonotoneX)
                    .x(d => this.xScale(d.date))
                    .y0(d => this.yScale(d.yEnd))
                    .y1(d => this.yScale(d.yStart))
            );
    }
}
