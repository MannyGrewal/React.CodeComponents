export interface IRadioListData {
  id: string,
  name: string,
  desc?: string,
  selected?: boolean | false,
}

export interface IRadioListControlProps {
  data?: IRadioListData[],
  formFactor: "small" | "large",
  width: number,
  height: number,
  onChange: (id: string, isChecked: boolean | false) => void,
}