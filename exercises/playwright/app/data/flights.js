// Synthetic flight data for the fictional "Skyline Air". Not real schedules or fares.
// NOTE: taxAud comes from a legacy fare-import feed and is stored as a string.
const flights = [
  { id: 1, flightNo: 'SK101', from: 'SYD', to: 'MEL', departs: '07:00', priceAud: 320, taxAud: '35' },
  { id: 2, flightNo: 'SK103', from: 'SYD', to: 'MEL', departs: '13:30', priceAud: 289, taxAud: '35' },
  { id: 3, flightNo: 'SK102', from: 'MEL', to: 'SYD', departs: '09:15', priceAud: 305, taxAud: '35' },
  { id: 4, flightNo: 'SK201', from: 'SYD', to: 'BNE', departs: '08:45', priceAud: 210, taxAud: '28' },
  { id: 5, flightNo: 'SK202', from: 'BNE', to: 'SYD', departs: '16:20', priceAud: 225, taxAud: '28' },
  { id: 6, flightNo: 'SK301', from: 'SYD', to: 'PER', departs: '10:10', priceAud: 540, taxAud: '60' },
];

module.exports = { flights };
