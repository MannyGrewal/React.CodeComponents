import * as React from 'react';
import { Root, createRoot } from 'react-dom/client';
import App from './App';
import { IControlContextProps } from './context/ControlContext';
import { IInputs, IOutputs } from './generated/ManifestTypes';

const SmallFormFactorMaxWidth = 350;
const enum FormFactors {
  Unknown = 0,
  Desktop = 1,
  Tablet = 2,
  Phone = 3,
}

export class ActionCards implements ComponentFramework.StandardControl<IInputs, IOutputs> {
  _notifyOutputChanged: () => void;
  _rootContainer: Root;
  _selectedValue: string | undefined;
  _context: ComponentFramework.Context<IInputs>;
  _controlProps: IControlContextProps;

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary,
    container: HTMLDivElement
  ): void {
    // Add control initialization code
    this._notifyOutputChanged = notifyOutputChanged;
    this._rootContainer = createRoot(container!);
    this._context = context;
    this._context.mode.trackContainerResize(true);
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   */
  public updateView(context: ComponentFramework.Context<IInputs>): void {
    // Add code to update control view
    const formFactor =
      context.client.getFormFactor() == FormFactors.Phone ||
      (context.mode.allocatedWidth > 0 && context.mode.allocatedWidth < SmallFormFactorMaxWidth)
        ? 'small'
        : 'large';
    this._controlProps = {
      context: context,
      onChange: this.onChange,
      formFactor: formFactor,
    };
    this._rootContainer.render(React.createElement(App, this._controlProps));
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
   */
  public getOutputs(): IOutputs {
    return {
      name: this._selectedValue,
    };
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
    this._rootContainer.unmount();
  }

  onChange = (newValue: string | undefined): void => {
    this._selectedValue = newValue;
    this._notifyOutputChanged();
  };
}
