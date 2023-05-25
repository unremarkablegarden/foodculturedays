<template lang="pug">
.dates-tags
  span.d(v-for='(d,i) in allDates(node)')
    span {{ d }}
</template>

<script>
import {format, isValid, parseISO, parse, setDayOfYear} from 'date-fns'
import frLocale from 'date-fns/locale/fr-CH'

export default {
  props: {
    node: {
      type: Object,
      required: true
    }
  },
  methods: {
    allDates (node) {
      // add all the dates to an array
      let dates = []
      if (node.date_time) {
        let date = node.date_time
        if (date && ! dates.includes(date)) dates.push(date)
      }
      if (node.extra_days) {
        node.extra_days.forEach(d => {
          let date = d.extra_day
          if (date && ! dates.includes(date)) dates.push(date)
        })
      }
      
      // filter out empty
      if (dates.length == 0) return []

      // convert string to object
      dates = dates.map(d => new Date(d))

      // parse them
      // dates = dates.map(d => parseISO(d))
      
      // turn into numbers
      dates = dates.map(d => format(d, 'DDD'))
      // parse as ints
      dates = dates.map(d => parseInt(d))
      
      // remove dupes
      // dates = dates.filter((item, index) => dates.indexOf(item) === index)
      // doesn't work so give me a vanilla version
      // let added = []
      // let filtered = []
      // dates.forEach(d => {
      //   if (! added.includes(d) ) {
      //     added.push(d)
      //     filtered.push(d)
      //   }
      // })
      // dates = filtered
      // console.log('dates', dates);
      
      // sort
      dates = dates.sort()
      
      // THIS BROKE THE CODE???
      // turn into ranges
      dates = this.convertToRanges(dates)
      
      // // convert ranges to dates
      // dates = this.convertRangeToDates(dates)
      // debug
      // console.log('dates', dates)
      
      return dates
    },
    
    convertToRanges(numbers) {
      if (!Array.isArray(numbers) || numbers.length === 0) {
        return [];
      }

      const ranges = [];
      let startRange = numbers[0];
      let endRange = numbers[0];

      numbers.forEach((num, i) => {
        if (i === 0) return; // Skip the first element since we've already set startRange and endRange.

        if (num === endRange + 1) {
          endRange = num;
        } else {
          ranges.push(startRange === endRange ? startRange.toString() : `${startRange}-${endRange}`);
          startRange = endRange = num;
        }
      });

      ranges.push(startRange === endRange ? startRange.toString() : `${startRange}-${endRange}`);

      return ranges;
    },
  }
}
</script>

<style lang="scss">
.program-overview-time {
  margin-top: 0.25rem;
  padding-bottom: 0.25rem;
  font-size: 0.8rem;
  line-height: 1.5em;
  table, tr, td, p {
    padding: 0 !important;
    margin: 0 !important;
    
  }
}
.dts .d {
  display: inline-block;
  margin-right: 0.3rem;
  font-size: 0.7rem;
  line-height: 1em;
  border: 1px black solid;
  padding: 4px 6px 1px;
  border-radius: 10px;
  // ::after {
  //   content: ',';
  //   display: inline-block;
  //   margin-right: 0.2rem;
  // }
  // &:last-child {
  //   ::after {
  //     content: '';
  //   }
  // }
}
</style>