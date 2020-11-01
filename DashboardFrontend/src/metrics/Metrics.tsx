import React, {  useState, useEffect, useRef } from 'react';
import './Metrics.css';
import { StandardLayout, VerticalLayout } from '../styledComponent/SideLayout';
import { BASIC_BLUE, basicWhite, BASIC_GOLD } from '../styledComponent/StyleConstants';
import { SliderInput } from '../styledComponent/Inputs';
import styled from 'styled-components'

// d3

import { scaleTime, scaleLinear } from 'd3-scale';

import { max } from 'd3-array';
import { select } from 'd3-selection';
import * as d3 from "d3";
import thresholds from '../data/thresholds.json';
import data1 from '../data/data.json';

import { CheckboxFilter } from '../styledComponent/Molecule/Filter';
import { Checkboxes } from '../styledComponent/Molecule/Filter'
import DataPickers from '../styledComponent/Molecule/DatePicker'
// d3
import { useHistory } from 'react-router-dom';

interface MetricsProps {
    data: number[],
    size: number[],

}

// export interface Checkboxes {
//     label: string;
//     checked: boolean;

// }

// export interface CheckboxBlock {
//     columnOne: Array<Checkboxes>;
//     columnTwo: Array<Checkboxes>;
// }

// const checkboxColumnOne: Array<Checkboxes> =
//     [
//         { label: 'Select all', checked: false },

//         { label: 'Ad Manager', checked: false },
//         { label: 'Appnexus', checked: false },
//         { label: 'OpenX', checked: false },
//         { label: 'Outbrian', checked: false },
//         { label: 'JustPremium', checked: false }
//     ];

// const checkboxColumnTwo: Array<Checkboxes> =
//     [
//         { label: 'Unselect all', checked: false },

//         { label: 'YieldLab', checked: false },
//         { label: 'Teads', checked: false }

//     ];

const Metrics: React.FC<MetricsProps> = (props) => {
    const history = useHistory();

    const defaultBandWidth = 40;
    const [bandWidth, setBandwidth] = useState<number>(defaultBandWidth);
    const [svg, setSvg] = useState<any>(null);
    const [checkboxColumnOne, setCheckboxColumnOne] = useState<Array<Checkboxes>>([
        { label: 'Select all', checked: false },
        { label: 'Ad Manager', checked: false },
        { label: 'Appnexus', checked: false },
        { label: 'OpenX', checked: false },
        { label: 'Outbrian', checked: false },
        { label: 'Just Premium', checked: false }
    ]);
    const [checkboxColumnTwo, setCheckboxColumnTwo] = useState<Array<Checkboxes>>([
        { label: 'Unselect all', checked: false },
        { label: 'YieldLab', checked: false },
        { label: 'Teads', checked: false }

    ]);

    const data2 = Object.assign(data1, { title: "Time between eruptions (min.)" })
    const { data, size }: MetricsProps = props;

    const ref = useRef(null);
    var margin = ({ top: 20, right: 30, bottom: 30, left: 40 });
    const height = 500;
    const width = 700;
    const checkboxes: any = { columnOne: [], columnTwo: [] }

    const updateBandWidth = (bandWidth: number) => {
        function epanechnikov(bandwidth: number) {
            return (x: number) => Math.abs(x /= bandwidth) <= 1 ? 0.75 * (1 - x * x) / bandwidth : 0;
        }
        const kde = function (bandWidth: number) {
            const funcTemp = epanechnikov(bandWidth);
            return thresholds.map(t => [t, d3.mean(data2, d => funcTemp(t - d))]);
        }
        var density = kde(bandWidth);


        var x = d3.scaleLinear()
            .domain(d3.extent(data2) as Array<number>).nice()
            .range([margin.left, width - margin.right]);

        var bins = d3.histogram()
            .domain(x.domain() as [number, number])
            .thresholds(thresholds)
            (data2);

        var y = d3.scaleLinear()
            .domain([0, d3.max(bins, d => d.length) as number / data2.length])
            .range([height - margin.bottom, margin.top]);

        var line = d3.line()
            .curve(d3.curveBasis)
            .x(d => x(d[0]))
            .y(d => y(d[1]));


        svg.selectAll("path").remove();
        svg.append("path")
            .datum(density)
            .attr("fill", "none")
            .attr("stroke", basicWhite)
            .attr("stroke-width", 2.5)
            .attr("stroke-linejoin", "round")
            .attr("d", line as any);
        return density;
    }

    function chart(bandWidth: number) {
        var _svg = d3.select(ref.current);
        setSvg(_svg);
        _svg.attr("viewBox", `0 0 ${width} ${height}`);

        var x = d3.scaleLinear()
            .domain(d3.extent(data2) as Array<number>).nice()
            .range([margin.left, width - margin.right]);


        var bins = d3.histogram()
            .domain(x.domain() as [number, number])
            .thresholds(thresholds)
            (data2);

        var y = d3.scaleLinear()
            .domain([0, d3.max(bins, d => d.length) as number / data2.length])
            .range([height - margin.bottom, margin.top]);

        _svg.append("g")
            .attr("fill", BASIC_BLUE)
            .selectAll("rect")
            .data(bins)
            .join("rect")
            .attr("x", (d: any) => x(d.x0 as number) + 1)
            .attr("y", (d: any) => y(d.length / data2.length))
            .attr("width", (d: any) => {
                var temp = x(d.x1 as number) - x(d.x0 as number) - 1;
                return (temp === -1) ? 0 : temp;
            })
            .attr("height", (d: any) => y(0) - y(d.length / data2.length));

        function epanechnikov(bandwidth: number) {
            return (x: number) => Math.abs(x /= bandwidth) <= 1 ? 0.75 * (1 - x * x) / bandwidth : 0;
        }

        const kde = function (bandWidth: number) {
            const funcTemp = epanechnikov(bandWidth);
            return thresholds.map(t => [t, d3.mean(data2, d => funcTemp(t - d))]);
        }

        var density = kde(bandWidth);
        var line = d3.line()
            .curve(d3.curveBasis)
            .x(d => x(d[0]))
            .y(d => y(d[1]));

        _svg.append("path")
            .datum(density)
            .attr("fill", "none")
            .attr("stroke", basicWhite)
            .attr("stroke-width", 2.5)
            .attr("stroke-linejoin", "round")
            .attr("d", line as any);


        var xAxis = (g: any) => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x))
            .call((g: any) => g.append("text")
                .attr("x", width - margin.right)
                .attr("y", -6)
                .attr("fill", "#000")
                .attr("text-anchor", "end")
                .attr("font-weight", "bold"));
        // .text(data2.title));

        var yAxis = (g: any) => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(null, "%"))
            .call((g: any) => g.select(".domain").remove());
        _svg.append("g")
            .call(xAxis);
        _svg.append("g")
            .call(yAxis);

        return _svg.node();
    }
    const onCheckboxChanged = (e: React.ChangeEvent<HTMLInputElement>) => {

        // setState({ ...state, [event.target.name]: event.target.checked });
        var boxes: Array<Checkboxes>;
        var column: number = -1;
        if (e.currentTarget.name === 'one') {
            boxes = checkboxColumnOne;
            column = 1;
        } else {
            boxes = checkboxColumnTwo;
            column = 2

        }
        for (let ob of boxes) {
            if (ob.label === e.currentTarget.value) {
                if (ob.label === 'Select all') {
                    selectAll();
                    break;

                } else if (ob.label === 'Unselect all') {
                    unSelectAll();
                    break;
                }

                ob.checked = !ob.checked;
                if (column === 1) {
                    setCheckboxColumnOne([...boxes]);
                } else if (column === 2) {
                    setCheckboxColumnTwo([...boxes]);
                }
            }
        }
        console.log('lkjhgfds---', e.currentTarget.value, ' && ', e.currentTarget.checked, ' %% ', e.currentTarget.name);
    }

    const selectAll = () => {
        var checkColumnOne = checkboxColumnOne;
        var checkColumnTwo = checkboxColumnTwo;

        for (var ob of checkColumnOne) {
            ob.checked = true;
        }
        for (var ob of checkColumnTwo) {
            ob.checked = true;
        }
        setCheckboxColumnOne([...checkColumnOne]);
        setCheckboxColumnTwo([...checkColumnTwo]);
    }

    const unSelectAll = () => {
        var checkColumnOne = checkboxColumnOne;
        var checkColumnTwo = checkboxColumnTwo;

        for (var ob of checkColumnOne) {
            ob.checked = false;
        }
        for (var ob of checkColumnTwo) {
            ob.checked = false;
        }
        setCheckboxColumnOne([...checkColumnOne]);
        setCheckboxColumnTwo([...checkColumnTwo]);

    }


    useEffect(() => {
        chart(defaultBandWidth);
        console.log('ölkjhgfdfghjkjhgfd ', history, ' state: ', history.location.state);
        // if (history.location.state){
        //     console.log('in stateäää');
        //     // history.go(-1);
        // }
        return () => { chart(defaultBandWidth); }
    }, []);
    return (
        <StandardLayout /* bColor={basicGold} */ minWidth='772px' top='50px' direction='column'>

            <VerticalLayout bColor={BASIC_GOLD} padding='15px 15px' margin={'15px 15px'} shadow={'0px 4px 2px rgba(0,0,0,.2)'} justify='flex-start'>
                <DataPickers top='0px' />
                <CheckboxFilter checkboxes={{ columnOne: checkboxColumnOne, columnTwo: checkboxColumnTwo }} onCheckboxChanged={onCheckboxChanged} />

            </VerticalLayout>
            <VerticalLayout bColor={BASIC_GOLD} padding='15px 15px' margin={'15px 15px'} shadow={'2px 4px 2px rgba(0,0,0,.2)'} >
                <div style={{ margin: '5px 0 5px 45px' }}>
                    <SliderInput type="range" name="desitySlider" width={'200px'} thumpColor={BASIC_BLUE} id="desitySlider" min="10" max="100" value={bandWidth} onChange={(e: { target: HTMLInputElement; }) => {
                        setBandwidth(Number(e.target.value));
                        updateBandWidth(Number(e.target.value));
                    }} />
                </div>

                <svg ref={ref}
                    width={width} height={height}>
                </svg>

            </VerticalLayout>

            {/* <CheckboxWrapper /> */}
        </StandardLayout>
        // <div className="metrics-container">
        //     <div className="container">
        //         <div className="graf-bg-container">
        //             <div className="graf-layout">
        //                 <div className="graf-circle"></div>
        //                 <div className="graf-circle"></div>
        //                 <div className="graf-circle"></div>
        //                 <div className="graf-circle"></div>
        //                 <div className="graf-circle"></div>
        //                 <div className="graf-circle"></div>
        //                 <div className="graf-circle"></div>
        //                 <div className="graf-circle"></div>
        //                 <div className="graf-circle"></div>
        //                 <div className="graf-circle"></div>
        //                 <div className="graf-circle"></div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );

}
export default Metrics;