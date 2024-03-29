interface ISidebarSectionHeading {
    title: string;
    initiallyCollapsed: boolean;
    children: JSX.Element[];
}

/**
 * Renders a collapsible side bar section header which contains child ui elements.
 *
 * @param props The side bar properties.
 * @returns The rendered side bar section.
 */
export function SidebarSectionHeading(props: ISidebarSectionHeading) {
    const titleID = props.title.replace(/\W/g, '_');
    return (
        <div className="position-relative my-4 mb-1">
            <div className="d-flex my-3">
                <button
                    className={'btn btn-secondary hamburgerButton mt-0 mb-0 pt-0 pb-0 me-4'}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${titleID}`}
                    aria-expanded={props.initiallyCollapsed ? 'false' : 'true'}
                    aria-controls={titleID}>
                    ☰
                </button>
                <h6 className="sidebar-heading m-0 my-auto">{props.title}</h6>
            </div>
            <div className={'collapse ' + (props.initiallyCollapsed ? '' : 'show')} id={titleID}>
                {props.children}
            </div>
        </div>
    );
}
