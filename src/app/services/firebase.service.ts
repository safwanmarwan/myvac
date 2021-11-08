import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  nat_data: {
    date: string;
    state: string;
    daily_partial: number;
    daily_full: number;
    daily: number;
    daily_partial_child: number;
    daily_full_child: number;
    daily_booster: number;
    cumul_partial: number;
    cumul_full: number;
    cumul: number;
    cumul_partial_child: number;
    cumul_full_child: number;
    cumul_booster: number;
    pfizer1: number;
    pfizer2: number;
    sinovac1: number;
    sinovac2: number;
    astra1: number;
    astra2: number;
    cansino: number;
    pending: number;
  } = {
    date: "",
    state: "",
    daily_partial: 0,
    daily_full: 0,
    daily: 0,
    daily_partial_child: 0,
    daily_full_child: 0,
    daily_booster: 0,
    cumul_partial: 0,
    cumul_full: 0,
    cumul: 0,
    cumul_partial_child: 0,
    cumul_full_child: 0,
    cumul_booster: 0,
    pfizer1: 0,
    pfizer2: 0,
    sinovac1: 0,
    sinovac2: 0,
    astra1: 0,
    astra2: 0,
    cansino: 0,
    pending: 0,
  };
  sum_state_data: {
    johor: number;
    kedah: number;
    kelantan: number;
    melaka: number;
    negeri_sembilan: number;
    pahang: number;
    perak: number;
    perlis: number;
    pulau_pinang: number;
    sabah: number;
    sarawak: number;
    selangor: number;
    terengganu: number;
    kuala_lumpur: number;
    labuan: number;
    putrajaya: number;
  } = {
    johor: 0,
    kedah: 0,
    kelantan: 0,
    melaka: 0,
    negeri_sembilan: 0,
    pahang: 0,
    perak: 0,
    perlis: 0,
    pulau_pinang: 0,
    sabah: 0,
    sarawak: 0,
    selangor: 0,
    terengganu: 0,
    kuala_lumpur: 0,
    labuan: 0,
    putrajaya: 0,
  }

  constructor() { }

  getAllRecords() {
    return new Promise((resolve, reject) => {
      firebase
      .database()
      .ref(`vac_data`)
      .once('value')
      .then((res) => {
        resolve(res.val());
      }), (error: any) => {
        reject(error);
      }
    })
  }

  getStateDateRecords(date, state) {
    let filter: any;
    return new Promise((resolve, reject) => {
      firebase
      .database()
      .ref(`vac_data`)
      .orderByChild('date')
      .equalTo(date)
      .once('value')
      .then((res) => {
        res.forEach(data => {
          let dt = data.val()
          // console.log(dt)
          if (state.toLowerCase() == ('Malaysia').toLowerCase()) {
            this.nat_data.daily_partial = this.nat_data.daily_partial +  Number(dt.daily_partial)
            this.nat_data.daily_full = this.nat_data.daily_full +  Number(dt.daily_full)
            this.nat_data.daily = this.nat_data.daily +  Number(dt.daily)
            this.nat_data.daily_partial_child = this.nat_data.daily_partial_child +  Number(dt.daily_partial_child)
            this.nat_data.daily_full_child = this.nat_data.daily_full_child +  Number(dt.daily_full_child)
            this.nat_data.daily_booster = this.nat_data.daily_booster +  Number(dt.daily_booster)
            this.nat_data.cumul_partial = this.nat_data.cumul_partial +  Number(dt.cumul_partial)
            this.nat_data.cumul_full = this.nat_data.cumul_full +  Number(dt.cumul_full)
            this.nat_data.cumul = this.nat_data.cumul +  Number(dt.cumul)
            this.nat_data.cumul_partial_child = this.nat_data.cumul_partial_child +  Number(dt.cumul_partial_child)
            this.nat_data.cumul_full_child = this.nat_data.cumul_full_child +  Number(dt.cumul_full_child)
            this.nat_data.cumul_booster = this.nat_data.cumul_booster +  Number(dt.cumul_booster)
            this.nat_data.pfizer1 = this.nat_data.pfizer1 +  Number(dt.pfizer1)
            this.nat_data.pfizer2 = this.nat_data.pfizer2 +  Number(dt.pfizer2)
            this.nat_data.sinovac1 = this.nat_data.sinovac1 +  Number(dt.sinovac1)
            this.nat_data.sinovac2 = this.nat_data.sinovac2 +  Number(dt.sinovac2)
            this.nat_data.astra1 = this.nat_data.astra1 +  Number(dt.astra1)
            this.nat_data.astra2 = this.nat_data.astra2 +  Number(dt.astra2)
            this.nat_data.cansino = this.nat_data.cansino +  Number(dt.cansino)
            this.nat_data.pending = this.nat_data.pending +  Number(dt.pending)

            // console.log("DT", dt)
            // console.log("NAT", this.nat_data)
          }
          else if (state.toLowerCase() == dt.state.toLowerCase()) {
            filter = dt
            console.log("FB",dt)
          }
          // console.log("getStateDate", data.val())
        })
        if (state.toLowerCase() == ('Malaysia').toLowerCase()) {
          this.nat_data.date = date
          this.nat_data.state = state
          console.log("Data", this.nat_data)
          resolve(this.nat_data);
        } else {
          console.log("Data", filter)
          resolve(filter);
        }
      }), (error: any) => {
        reject(error);
      }
    })
  }

  getDateRecord(date) {
    return new Promise((resolve, reject) => {
      firebase
      .database()
      .ref(`vac_data`)
      .orderByChild('date')
      .equalTo(date)
      .once('value')
      .then((res) => {
        res.forEach(result => {
          let data = result.val()
          let statename = data[`state`].toLowerCase().replace('w.p. ', '').replace(' ', '_')
          this.sum_state_data[statename] = data[`cumul_full`]
          // console.log(data[`state`].toLowerCase().replace('w.p. ', '').replace(' ', '_'))
        })
        // console.log("SUM STATE DATA", this.sum_state_data)
        // console.log("Date Record", res.val())
        resolve(this.sum_state_data)
      }), (error: any) => {
        reject(error);
      }
    })
  }

  getFirstEntryDate() {
    let data: any;
    return new Promise((resolve, reject) => {
      firebase
      .database()
      .ref(`vac_data`)
      .orderByChild('date')
      .limitToFirst(1)
      .once('value')
      .then((res) => {
        res.forEach(result => {
          // console.log(result.val().date)
          data = result.val().date
        })
        resolve(data);
      }), (error: any) => {
        reject(error);
      }
    })
  }

  getLastEntryDate() {
    let data: any;
    return new Promise((resolve, reject) => {
      firebase
      .database()
      .ref(`vac_data`)
      .orderByChild('date')
      .limitToLast(1)
      .once('value')
      .then((res) => {
        res.forEach(result => {
          // console.log(result.val().date)
          data = result.val().date
        })
        resolve(data);
      }), (error: any) => {
        reject(error);
      }
    })
  }

  // testRecord(id) {
  //   return new Promise((resolve, reject) => {
  //     firebase
  //     .firestore().collection(`limit`).doc(id).get().then((res) => {
  //       try {
  //         resolve(res.data());
  //       }
  //       catch
  //       {
  //         console.log(id);
  //       }
  //     }, err => {
  //       reject(err);
  //       console.log(err);
  //     })
  //   })
  // }

  readAllRecords() {
    let firestore_db = firebase.firestore();
    // let list_top_20 = []
    let data: any;
    return new Promise((resolve, reject) => {

      firestore_db.collection(`limit`).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          // console.log(doc.data())
          // console.log(this.list_top_20)
          // list_top_20.push(doc.id)
          // console.log(list_top_20)
          data = doc.data()
        });
        resolve(data);
        // return list_top_20
      }, err => {
        reject(err);
      });
    })
  }

  // GetUserCourse(user: any = []) {
  //   let user_cred = user[0];
  //   if (user.length !== 0) {
  //     return new Promise((resolve, reject) => {
  //       firebase
  //         .database()
  //         .ref(`ilhami_web_app/account/user/${user_cred[`uid`]}`)
  //         .once('value')
  //         .then((res) => {
  //           resolve(res.val());
  //         }),
  //         (error: any) => {
  //           reject(error);
  //         };
  //     });
  //   }
  // }
}
