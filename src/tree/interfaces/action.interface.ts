import { State } from './state.interface';

export interface Action {
  execute(state: State): Promise<void>;
}
