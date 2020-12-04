let app = new Vue({
  el: '#app',
  data: {
    number: '',
    max: '',
    current: {
      title: '',
      img: '',
      alt: ''
    },
    loading: true,
    addedName: '',
    addedComment: '',
    rating: '',
    comments: [],
    ratings: [],
  },
  created() {
    this.xkcd();
  },
  computed: {
    month() {
      console.log("Month "+this.current.month)
      var month = new Array;
      if (this.current.month === undefined)
        return '';
      month[0] = "January";
      month[1] = "February";
      month[2] = "March";
      month[3] = "April";
      month[4] = "May";
      month[5] = "June";
      month[6] = "July";
      month[7] = "August";
      month[8] = "September";
      month[9] = "October";
      month[10] = "November";
      month[11] = "December";
      return month[this.current.month - 1];
    }
  },
  watch: {
    number(value, oldvalue) {
      if (oldvalue === '') {
        this.max = value;
      } else {
        this.xkcd();
      }
    },
  },
  methods: {
    addComment() {
      if (!(this.number in this.comments)) {
        Vue.set(app.comments, this.number, new Array);
        this.ratings[this.number] = {count:0, rating:0};
      }

      this.comments[this.number].push({
        author: this.addedName,
        text: this.addedComment
      });

      var total = this.ratings[this.number].rating * this.ratings[this.number].count;
      total += rating;
      this.ratings[this.number].count++;
      this.ratings[this.number].rating = total /this.ratings[this.number].count;

      this.addedName = '';
      this.addedComment = '';
    },
    getRandom(min, max) {
      console.log("Min ",min," Max ",max);
      min = Math.ceil(min);
      max = Math.floor(max);
      console.log("Min ",min," Max ",max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive
    },
    randomComic() {
      this.number = this.getRandom(1, this.max);
      console.log()
    },
    previousComic() {
      this.number = this.current.num - 1;
      if (this.number < 1)
        this.number = 1;
    },
    nextComic() {
      this.number = this.current.num + 1;
      if (this.number > this.max)
        this.number = this.max
    },
    async xkcd() {
      try {
        this.loading = true;
        let url = 'https://xkcd.now.sh/?comic=';
        if (this.number === '') {
          url += 'latest';
        } else {
          url += this.number;
        }
        const response = await axios.get(url);
        this.current = response.data;
        this.loading = false;
        this.number = response.data.num;
      } catch (error) {
        this.number = this.max;
        console.log(error);
      }
    },
  }
});
