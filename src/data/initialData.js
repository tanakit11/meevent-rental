export const FB = 'https://www.facebook.com/';

export const initialState = {
  cats: ['ทั้งหมด','โต๊ะ-เก้าอี้','เต็นท์-ผ้าใบ','แสงสีเสียง','ดอกไม้-ตกแต่ง','อาหาร-เครื่องดื่ม'],
  products: [
    {id:1,name:'โต๊ะกลม 10 ที่นั่ง',cat:'โต๊ะ-เก้าอี้',price:350,desc:'โต๊ะกลมพร้อมผ้าปูโต๊ะสีขาว',fb:FB,img:'https://images.unsplash.com/photo-1549294413-26f195200c16?w=400&q=80',icon:'🍽️',status:'active'},
    {id:2,name:'เต็นท์โดมขนาดใหญ่',cat:'เต็นท์-ผ้าใบ',price:2500,desc:'เต็นท์โดมจุคน 100 ท่าน',fb:FB,img:'https://images.unsplash.com/photo-1478827387698-1527781a4887?w=400&q=80',icon:'⛺',status:'active'},
    {id:3,name:'ชุดไฟประดับ LED',cat:'แสงสีเสียง',price:1200,desc:'ไฟประดับ LED สีทองสวยงาม',fb:FB,img:'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80',icon:'💡',status:'active'},
    {id:4,name:'ช่อดอกไม้ตกแต่ง',cat:'ดอกไม้-ตกแต่ง',price:800,desc:'ดอกไม้สดจัดเป็นช่อพิเศษ',fb:FB,img:'https://images.unsplash.com/photo-1487530811015-780dfc5f16d8?w=400&q=80',icon:'💐',status:'active'},
    {id:5,name:'เก้าอี้ชิโนวารี',cat:'โต๊ะ-เก้าอี้',price:45,desc:'เก้าอี้หรูพร้อมผ้าคลุม',fb:FB,img:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',icon:'🪑',status:'active'},
    {id:6,name:'ระบบเสียง PA 1000W',cat:'แสงสีเสียง',price:3500,desc:'ลำโพงพร้อมไมค์และมิกเซอร์',fb:FB,img:'',icon:'🎵',status:'draft'},
  ],
  nextId: 7,
};
