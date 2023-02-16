import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Instruction } from '../../interfaces/instructions.interface';
import { getAllInstructions} from '../../services/dataApi';

export interface InstructionsState {
    instructionsList: Instruction[];
}

const initialState: InstructionsState = {
    instructionsList: [],
}

export const fetchAllInstructions = createAsyncThunk('instructions/getAll', 
    async () => {
        const response = await getAllInstructions();
        return response;
})

export const instructionsSlice = createSlice({
  name: 'instructions',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
      builder.addCase(fetchAllInstructions.fulfilled, (state, action) => {
        state.instructionsList = action.payload;
      })
  },
})

export const { } = instructionsSlice.actions;

export default instructionsSlice.reducer