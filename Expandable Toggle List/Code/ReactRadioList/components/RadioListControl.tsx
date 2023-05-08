import * as React from 'react';
import { useState } from 'react';
import { Label } from '@fluentui/react';
import { IRadioListControlProps, IRadioListData } from '../interfaces.js'
import '../styles/RadioListControl.css'
import { RadioListItem } from './RadioListItem'
import { RadioListContext } from './RadioListContext';


export const RadioListControl = (props: IRadioListControlProps) => {
  return (
    <div className='radioData' style={{ maxWidth: `${props.width}px` }}>
      {props.data?.map((item: IRadioListData, index) => {
        return (
          <>
            <RadioListItem id={item.id} selected={item.selected} data={item} layout={props.formFactor} onToggle={props.onChange} />
          </>
        )
      })}
    </div>
  )
}

