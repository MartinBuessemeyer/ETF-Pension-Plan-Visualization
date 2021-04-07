import { ChangeEvent, MouseEvent } from 'react';

import { ETFTextInputElement } from './TextInputElement';
import { ErrorMessage } from './ErrorMessageComponent';

import { IETFProperty } from '../model/ForecastModel';


interface IETFIndex {
    [etfIdentifier: string]: IETFProperty;
}

export interface IETFSelection {
    label: string;
    isValid: boolean;
    identifier: string;
    errorMessage: string;
    handleSelectionChange: (etfProperties: IETFProperty) => void;
    handleShareChange: (changedValue: string, changedStateIdentifier: string) => void;
    elements: IETFIndex;
}

type ETFSelectionDropDownProps = IETFSelection & { autoPercentage: boolean };

/**
 * Transforms the changed value to a percentage. Uses 0 as fallback if the value is not a valid float.
 * 
 * @param e The change event.
 * @returns 
 */
function percentageTransformFunction(e: ChangeEvent<HTMLInputElement>) {
    const floatVal = parseFloat(e.target.value) / 100;
    return isNaN(floatVal) ? 0 : floatVal;
}

/**
 * Renders the ETF selection drop down which includes editable text for the percentages.
 * 
 * @param props The etf drop down properties.
 * @returns The rendered ETF selection drop down.
 */
export function ETFSelectionDropDown(props: ETFSelectionDropDownProps) {
    return (
        <div className="dropdown position-relative">
            <button
                className="btn btn-secondary dropdown-toggle is-invalid"
                type="button"
                id="ETFSelectionDropDown"
                data-bs-toggle="dropdown"
                aria-expanded="false">
                {props.label}
            </button>
            <ErrorMessage {...props} />
            <ul className="dropdown-menu" aria-labelledby="ETFSelectionDropDown">
                {Object.keys(props.elements).map(elementIdentifier => (
                    <li key={elementIdentifier}>
                        <button
                            className={
                                props.elements[elementIdentifier].selected ? 'dropdown-item active' : 'dropdown-item'
                            }
                            type="button"
                            onClick={(e: MouseEvent<HTMLButtonElement>) => {
                                //if (e.target.type !== 'text') {
                                props.handleSelectionChange(props.elements[elementIdentifier]);
                                //}
                            }}>
                                {/** das problem ist dass der identifier kieneswegs ein Text... ist. */}
                            <ETFTextInputElement
                                {...props.elements[elementIdentifier]}
                                value={props.elements[elementIdentifier].value}
                                textAppending="%"
                                onValueChange={props.handleShareChange}
                                disabled={props.autoPercentage}
                                isValid={true}
                                errorMessage=""
                            />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
