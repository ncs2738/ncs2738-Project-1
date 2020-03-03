// Vue component used for displaying the kanji search results
// NOTE: the tr is kind of a giant mess; I had to add alot of
// event listeners because there are 4 different buttons in each row.
// It works though!

/* eslint-disable */
Vue.component('result-list', {
  props: ['results', 'status'],
  template: `<div>

<table class="table table-striped table-dark table-bordered table-hover text-center">
<thead>
<tr>
<th scope="col">Time</th>
<th scope="col">TO - DO</th>
<th scope="col">Delete?</th>
</tr>
</thead>

<tbody> 
<tr is="result-list-row" v-for="result in results" v-bind:result="result"  
@copy="$emit('copy', result.kanji)" @tts-kanji="$emit('tts', result.kanji)">
</tr>
</tbody>

<tr>
<td colspan="8">{{status}}</td>
</tr>
</div>`,
});

// Component used for creating each new result in the table.
// The buttons are classed as widgets
Vue.component('result-list-row', {
  props: ['result'],
  template:
`<tr>
<td>{{result.time}}</td>
<td>{{result.entry}}</td>
<td scope="row">
<button class="widget" @click="$emit('copy',result.kanji)">Copy!</button>
</td>
</tr>`,
});
