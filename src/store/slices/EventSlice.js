import { createSlice } from "@reduxjs/toolkit";

export const eventSlice = createSlice({
    name: 'Event',
    initialState: {
        eventList: [{
            title: 'Halloween RhuanzinshowXd',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, deserunt esse sunt laborum molestiae, pariatur veritatis magni ipsum tempore iure deleniti culpa soluta tenetur nesciunt ratione perspiciatis cum. Perferendis, delectus!',
            location: 'Pilares - RJ',
            price: 'R$ 18,48',
            date: '20/11/2024',
            start_time: '17:50',
            end_time: '02:30',
            capacity: '50',
            used_capacity: '20'
        }],
    },


    reducers: {
        addEvent: (state, action) => {
            state.eventList.push(action.payload);
        }
    }
})


export const { addEvent } = eventSlice.actions;

export default eventSlice.reducer;