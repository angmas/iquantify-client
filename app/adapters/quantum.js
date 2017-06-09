import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  createRecord (store, type, record) {
    console.log('record is : ', record);
    console.log('store is: ', store);
    console.log('type is: ', type);
    let api = this.get('host');
    let serialized = this.serialize(record, { includeId: true});
    console.log('serialized: ', serialized);
    const researchId = serialized.research_id;
    let url = `${api}/research/${researchId}`;
    const data = { quantum: serialized }
    return this.ajax(url, 'POST', { data });
    }
});
