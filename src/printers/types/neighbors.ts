import { Nullable } from '../../shared/types/nullable'
import { Module } from '../../core/shared/types/module'

export interface Neighbors  {
  topLeft: Nullable<Module>
  top: Nullable<Module>
  topRight: Nullable<Module>
  right: Nullable<Module>
  bottomRight: Nullable<Module>
  bottom: Nullable<Module>
  bottomLeft: Nullable<Module>
  left: Nullable<Module>
}
