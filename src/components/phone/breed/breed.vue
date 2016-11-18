<script>
  import './breed.scss'
  import axios from 'axios'
  export default{
    template: require('./breed.html'),
    ready(){

      this.breedId = this.$route.query.id;
      this.accessToken = this.$route.query.accss_token;
      this.fetchBreed();
    },
    components:{
      loading:require('../loading/loading.vue')
    },
    methods:{

      sortCharas(){

        for(let c in this.breed.characteristics){

          if(c == this.breed.characteristics.length - 1){

            this.finishSoring = true;
          }

          if(!this.finishSoring) {
            switch (this.breed.characteristics[c].category) {

//            breedCharas:[{title:'Adaptability',sub_charas:[]},{title:'All Around Friendliness',sub_charas:[]},{title:'Health Grooming',sub_charas:[]},{title:'Trainability',sub_charas:[]},{title:'Exercise Needs',sub_charas:[]}]

              case 'Adaptability':
                this.breedCharas[0].subCharas.push(this.breed.characteristics[c]);
                break;
              case 'All Around Friendliness':
                this.breedCharas[1].subCharas.push(this.breed.characteristics[c]);
                break;
              case 'Health Grooming':
                this.breedCharas[2].subCharas.push(this.breed.characteristics[c]);
                break;
              case 'Trainability':
                this.breedCharas[3].subCharas.push(this.breed.characteristics[c]);
                break;
              case 'Exercise Needs':
                this.breedCharas[4].subCharas.push(this.breed.characteristics[c]);
                break;

            }

          }

        }

        let img = new Image();
        img.onload = function() {
          $('#loading').fadeOut(function(){
            this.fetching = false;
          })
        }
        img.src = this.breed.bannerImage



      },

      fetchBreed(){

        this.fetching = true;

        axios({
          method: 'GET', url:`http://service.dreamdogapp.com/api/breeds/${this.breedId}`, headers: {
            'Authorization': 'Bearer' + this.accessToken
          }
        }).then((res)=>{

          this.breed = res.data;
          this.sortCharas(this.breed)
        })


      },

      slideDownList(e){

        $(e.currentTarget).css('background','transparent','important');

//        console.log($(e.currentTarget).find('.arrow').attr('class','fa fa-angle-down'))
        if($(e.currentTarget).next().css('display') == 'none') {

          $(e.currentTarget).next().slideDown();
          $(e.currentTarget).find('.arrow').find('i').attr('class','fa fa-angle-up')
        }else{

          $(e.currentTarget).next().slideUp();
          $(e.currentTarget).find('.arrow').find('i').attr('class','fa fa-angle-down')
        }

      }

    },
    data(){
      return {
        breedId:null,
        accessToken:null,
        breed:null,
        fetching:true,
        finishSoring:false,
        w_bone:require('./resources/bone_white.png'),
        p_bone:require('./resources/bone_violet.png'),
        d_sign:require('./resources/d_s.png'),
        d_t_sign:require('./resources/d_s_t.png'),
        breedCharas:[{title:'Adaptability',subCharas:[]},{title:'All Around Friendliness',subCharas:[]},{title:'Health Grooming',subCharas:[]},{title:'Trainability',subCharas:[]},{title:'Exercise Needs',subCharas:[]}]
      }
    }
  }
</script>
