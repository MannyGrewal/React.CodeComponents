import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { RadioListControl } from "./components/RadioListControl";
import { IRadioListControlProps, IRadioListData } from "./interfaces"
import * as React from "react";
import mockdata from "./mockdata";

const SmallFormFactorMaxWidth = 500;

const enum FormFactors {
    Unknown = 0,
    Desktop = 1,
    Tablet = 2,
    Phone = 3,
}
const enum OpType {
    Associate = 0,
    Dissociate = 1,
}

export class ReactExpandableToggles implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
    private _context: any;
    private notifyOutputChanged: () => void;
    private _value: ComponentFramework.LookupValue[] | null;
    private _config_entity_name: string | null;
    private _config_entity_fieldname: string | null;
    private _config_entity_IDfieldname: string | null;
    private _config_entity_desc_fieldname: string | null;
    private _config_entity_type_name: string | null;
    private _config_nn_relationship_name: string | null;


    private _controlWidth: number | null;
    private _controlHeight: number | null;
    private _controlConfigData: IRadioListData[] = [];

    private _hostRecordId: string | null;
    private _hostEntityTypeName: string | null;
    private _clientUrl: string | null;
    private _currentValue?: ComponentFramework.LookupValue[];

    /**
     * Empty constructor.
     */
    constructor() { }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        console.log('ReactRadioList init.')
        this.notifyOutputChanged = notifyOutputChanged;
        this._context = context;
        this._context.mode.trackContainerResize(true);
        //Assign all the control's attributes to local variables
        this._value = context.parameters.value.raw;
        this._config_entity_name = context.parameters.config_entity_name.raw;
        this._config_entity_fieldname = context.parameters.config_entity_fieldname.raw;
        this._config_entity_desc_fieldname = context.parameters.config_entity_desc_fieldname.raw;
        this._config_nn_relationship_name = context.parameters.config_nn_relationship_name.raw;
        this._config_entity_IDfieldname = context.parameters.config_entity_idfieldname.raw;
        this._config_entity_type_name = context.parameters.value.getTargetEntityType();

        this._hostRecordId = this._context.page.entityId;
        this._hostEntityTypeName = this._context.page.entityTypeName;
        this._clientUrl = this._context.page.getClientUrl();

        this.retrieveMasterData();
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        console.log('ReactRadioList updateView.')
        return this.renderControl(context);
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
     */
    public getOutputs(): IOutputs {
        return {
            value: this._currentValue
        } as IOutputs;
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }

    private renderControl(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const formFactor = context.client.getFormFactor() == FormFactors.Phone || (context.mode.allocatedWidth > 0 && context.mode.allocatedWidth < SmallFormFactorMaxWidth)
            ? "small"
            : "large";
        this._controlWidth = context.mode.allocatedWidth;
        this._controlHeight = context.mode.allocatedHeight;

        //data: mockdata, data: this._controlConfigData
        //selectedId:"3",selectedId: this._selectedRecordId
        const props: IRadioListControlProps = { data: this._controlConfigData, formFactor: formFactor, width: this._controlWidth, height: this._controlHeight, onChange: this.handleToggle };
        return React.createElement(RadioListControl, props);
    }

    private retrieveMasterData = (): void => {
        // Build FetchXML to retrieve the master data
        let fetchXML = "<fetch distinct='false' mapping='logical'>";
        fetchXML += `<entity name='${this._config_entity_name}'>`;
        fetchXML += `<attribute name='${this._config_entity_IDfieldname}' alias='id' />`;
        fetchXML += `<attribute name='${this._config_entity_fieldname}' alias='name' />`;
        fetchXML += `<attribute name='${this._config_entity_desc_fieldname}' alias='desc' />`;
        fetchXML += "<filter>";
        fetchXML += `<condition attribute='statecode' operator='eq' value='0' />`;
        fetchXML += "</filter>";
        fetchXML += "</entity>";
        fetchXML += "</fetch>";

        // Invoke the Web API RetrieveMultipleRecords method to calculate the aggregate value
        this._context.webAPI.retrieveMultipleRecords(this._config_entity_name as string, `?fetchXml=${fetchXML}`).then(
            (response: ComponentFramework.WebApi.RetrieveMultipleResponse) => {
                response.entities.map(record => {
                    this._controlConfigData.push({ id: record.id, name: record.name, desc: record.desc });
                })
                this.findExistingData()
            },
            (errorResponse: any) => {
                // Error handling code here
                console.log(errorResponse);
            }
        );
    }

    private handleToggle = (id: string, isChecked: boolean | false): void => {
        const intersectEntityName = "ata_contact_ata_employmenttype";

        if (isChecked) {
            this.performDataverseNN(id, OpType.Associate)
        }
        else {
            this.performDataverseNN(id, OpType.Dissociate)
        }
        this._currentValue = [{
            id: id,
            entityType: this._config_entity_type_name ?? "",
        }]
        this.notifyOutputChanged();
    }

    private findExistingData = () => {
        // Invoke the Web API RetrieveMultipleRecords method to calculate the aggregate value
        this._context.webAPI.retrieveMultipleRecords(this._config_nn_relationship_name as string, `?$select=${this._config_entity_IDfieldname}&$filter=${this._hostEntityTypeName}id eq ${this._hostRecordId}`).then(
            (response: ComponentFramework.WebApi.RetrieveMultipleResponse) => {
                response.entities.map(record => {
                    let match = this._controlConfigData.find((obj) => { return obj.id == record.ata_employmenttypeid });
                    match && (match.selected = true);
                })
                this.updateView(this._context);
            },
            (errorResponse: any) => {
                // Error handling code here
                console.log(errorResponse);
            }
        );
    }
    private performDataverseNN = (id: string, op: OpType): void => {
        let baseUrl: string = `${this._clientUrl}/api/data/v9.2/`
        let hostRecordUrl: string = `${baseUrl}${this._hostEntityTypeName}s(${this._hostRecordId})`;
        let nnRequestUrl: string = `${baseUrl}${this._config_entity_name}s(${id})/${this._config_nn_relationship_name}`

        if (op == OpType.Associate) {
            let associate = {
                "@odata.id": hostRecordUrl
            };

            let req = new XMLHttpRequest();
            req.open("POST", `${nnRequestUrl}/$ref`, true);
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");
            req.onreadystatechange = function () {
                if (this.readyState == 4 /* complete */) {
                    req.onreadystatechange = null;
                    if (this.status == 204) {
                        //console.log('Record Associated')
                    } else {
                        var error = JSON.parse(this.response).error;
                        console.log(error.message);
                    }
                }
            };
            req.send(JSON.stringify(associate));
        }
        else if (OpType.Dissociate) {
            let req = new XMLHttpRequest();
            req.open("DELETE", `${nnRequestUrl}(${this._hostRecordId})/$ref`, true);
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("Content-Type", "application/json; charset=utf-8");
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");
            req.onreadystatechange = function () {
                if (this.readyState == 4 /* complete */) {
                    req.onreadystatechange = null;
                    if (this.status == 204) {
                        //console.log('Record Dissociated')
                    } else {
                        var error = JSON.parse(this.response).error;
                        console.log(error.message);
                    }
                }
            };
            req.send();
        }
    }
}
