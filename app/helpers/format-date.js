import Ember from 'ember';
import moment from 'moment';

// export function formatDate(params, hash) {
//   compute(params, hash) {
//     let newDate
//     if (hash.formatType === 'datetime') {
//       newDate = moment(params).format('MM/DD/YYYY h:mm:ss a');
//     } else if (has.formatType == 'date') {
//       newDate = moment(params).format('MM/DD/YYYY');
//     } else {
//       newDate = params
//     }
//     return newDate;
//   }
// }

export default Ember.Helper.extend({
  compute(params, hash) {
    {
      let formattedDate;
      // console.log('params: ', params)
      // console.log('hash: ', hash)
      if (hash.formatType === 'datetime') {
        formattedDate = moment(params, moment.ISO_8601).format('MM/DD/YYYY h:mm:ss a');
      } else if (hash.formatType === 'date') {
        formattedDate = moment(params, moment.ISO_8601).format('MM/DD/YYYY');
      } else {
        formattedDate = params;
      }
      return formattedDate;
    }
  }
});
