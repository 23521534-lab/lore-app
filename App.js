import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Dimensions, StatusBar, FlatList, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const C = {
  bg:'#0e0c1a', card:'rgba(255,255,255,0.05)', cardBorder:'rgba(255,255,255,0.08)',
  lavender:'#c9b8f5', petal:'#f7a8c4',
  text:'rgba(255,255,255,0.92)', textSub:'rgba(255,255,255,0.5)', textMuted:'rgba(255,255,255,0.25)',
};

const ITEMS = [
  {id:'1',type:'film',title:'Past Lives',creator:'Celine Song',year:'2023',cover:'https://image.tmdb.org/t/p/w500/k3waqVXSnYrXnCajvXtfHdqU5mw.jpg',gradient:['#2d1040','#8b4f9e','#f7a8c4'],status:'watched',tags:['♡','⋆｡°✩'],note:'Made me feel seen in a way I did not expect. One of those films that just stays with you.'},
  {id:'2',type:'film',title:'Aftersun',creator:'Charlotte Wells',year:'2022',cover:'https://image.tmdb.org/t/p/w500/9nPmtzpTpTlZqDV3OuHF7B5P4rB.jpg',gradient:['#0d2137','#1a5276','#a8d8ea'],status:'watched',tags:['⋆｡°✩'],note:'Stayed with me for weeks. The ambiguity is the whole point.'},
  {id:'3',type:'film',title:'Dune Part II',creator:'Denis Villeneuve',year:'2024',cover:'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',gradient:['#1a1a1a','#4a3000','#c8a951'],status:'want',tags:[],note:''},
  {id:'4',type:'film',title:'Everything Everywhere',creator:'Daniels',year:'2022',cover:'https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg',gradient:['#1f0a2e','#6b2d8b','#ff6b9d'],status:'watching',tags:['♡'],note:''},
  {id:'5',type:'film',title:'The Substance',creator:'Coralie Fargeat',year:'2024',cover:'https://image.tmdb.org/t/p/w500/lqoMzCcZYEFK729d6qzt349fB4o.jpg',gradient:['#1a0a0a','#6b0000','#ff4444'],status:'want',tags:[],note:''},
  {id:'6',type:'film',title:'Poor Things',creator:'Yorgos Lanthimos',year:'2023',cover:'https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXIf6bf5AOInGxI.jpg',gradient:['#0a1a0a','#1a5276','#98e4d0'],status:'want',tags:[],note:''},
  {id:'7',type:'book',title:'Normal People',creator:'Sally Rooney',year:'2018',cover:'https://covers.openlibrary.org/b/id/10527843-L.jpg',gradient:['#ffd6a5','#ffb3c6'],status:'read',tags:['♡','⋆｡°✩'],note:'The kind of book you miss before you finish it. Reread-worthy.'},
  {id:'8',type:'book',title:'Pachinko',creator:'Min Jin Lee',year:'2017',cover:'https://covers.openlibrary.org/b/id/10361120-L.jpg',gradient:['#a8d8ea','#c9b8f5'],status:'reading',tags:[],note:''},
  {id:'9',type:'book',title:'Piranesi',creator:'Susanna Clarke',year:'2020',cover:'https://covers.openlibrary.org/b/id/10515858-L.jpg',gradient:['#c5f0c0','#a8d8ea'],status:'want',tags:[],note:''},
  {id:'10',type:'book',title:'Yellowface',creator:'R.F. Kuang',year:'2023',cover:'https://covers.openlibrary.org/b/id/13256574-L.jpg',gradient:['#f5c6ec','#c9b8f5'],status:'want',tags:[],note:''},
  {id:'11',type:'book',title:'Tomorrow & Tomorrow',creator:'Jonathan Coe',year:'2022',cover:'https://covers.openlibrary.org/b/id/12547893-L.jpg',gradient:['#ffd6a5','#c9b8f5'],status:'want',tags:[],note:''},
  {id:'12',type:'music',title:'Stick Season',creator:'Noah Kahan',year:'2022',cover:'https://i.scdn.co/image/ab67616d0000b273f7db43292a6a1b8a29767a1b',gradient:['#c9b8f5','#f7a8c4'],status:'loved',tags:['♡'],note:''},
  {id:'13',type:'music',title:'Bewitched',creator:'Laufey',year:'2023',cover:'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',gradient:['#ffd6a5','#f7a8c4'],status:'loved',tags:['♡','⋆｡°✩'],note:'feels like a warm hug on a cold day'},
  {id:'14',type:'music',title:'Charm',creator:'Clairo',year:'2024',cover:'https://i.scdn.co/image/ab67616d0000b273af73e4a4716ae745ff4b75b9',gradient:['#c5f0c0','#c9b8f5'],status:'want',tags:[],note:''},
  {id:'15',type:'youtube',title:'lofi hip hop radio',creator:'Lofi Girl',year:'2024',cover:'https://i.ytimg.com/vi/jfKfPfyJRdk/maxresdefault.jpg',gradient:['#a8d8ea','#c5f0c0'],status:'active',tags:['✦'],note:''},
  {id:'16',type:'podcast',title:'Conan OBrien Needs a Friend',creator:'Conan OBrien',year:'2024',cover:'https://megaphone.imgix.net/podcasts/2a4e1e78-fbd1-11e8-9e0e-7326a6a3e2e7/image/conan_art.jpg',gradient:['#ffd6a5','#c9b8f5'],status:'active',tags:[],note:''},
  {id:'17',type:'game',title:'Stardew Valley',creator:'ConcernedApe',year:'2016',cover:'https://upload.wikimedia.org/wikipedia/en/f/fd/Logo_of_Stardew_Valley.png',gradient:['#c5f0c0','#ffd6a5'],status:'active',tags:['♡','↻'],note:'Cannot stop playing this.'},
];

const INITIAL_BOARDS = [
  {id:'b1',title:'2024 in culture',desc:'everything that defined my year',gradient:['#ff9ecb','#c9b8f5'],images:['https://image.tmdb.org/t/p/w200/k3waqVXSnYrXnCajvXtfHdqU5mw.jpg','https://covers.openlibrary.org/b/id/10527843-L.jpg','https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36','https://image.tmdb.org/t/p/w200/9nPmtzpTpTlZqDV3OuHF7B5P4rB.jpg']},
  {id:'b2',title:'cozy autumn reads',desc:'books for rainy days',gradient:['#ffd6a5','#ffb3c6'],images:['https://covers.openlibrary.org/b/id/10527843-L.jpg','https://covers.openlibrary.org/b/id/10361120-L.jpg','https://covers.openlibrary.org/b/id/10515858-L.jpg','https://covers.openlibrary.org/b/id/13256574-L.jpg']},
  {id:'b3',title:'films that wrecked me',desc:'the ones that stayed',gradient:['#1f0a2e','#c9b8f5'],images:['https://image.tmdb.org/t/p/w200/k3waqVXSnYrXnCajvXtfHdqU5mw.jpg','https://image.tmdb.org/t/p/w200/9nPmtzpTpTlZqDV3OuHF7B5P4rB.jpg','https://image.tmdb.org/t/p/w200/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg','https://image.tmdb.org/t/p/w200/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg']},
];

const GRADIENTS=[['#2d1040','#8b4f9e','#f7a8c4'],['#0d2137','#1a5276','#a8d8ea'],['#1a1a1a','#4a3000','#c8a951'],['#1f0a2e','#6b2d8b','#ff6b9d'],['#ffd6a5','#ffb3c6'],['#a8d8ea','#c9b8f5'],['#c5f0c0','#a8d8ea'],['#f5c6ec','#c9b8f5']];
const FILTERS=[{id:'all',label:'✦ all'},{id:'film',label:'⟡ films'},{id:'book',label:'꩜ books'},{id:'music',label:'∿ music'},{id:'youtube',label:'▷ youtube'},{id:'podcast',label:'◎ podcast'},{id:'game',label:'⬡ games'}];
const TYPES=[{id:'film',label:'⟡ film'},{id:'book',label:'꩜ book'},{id:'music',label:'∿ music'},{id:'youtube',label:'▷ youtube'},{id:'podcast',label:'◎ podcast'},{id:'game',label:'⬡ game'}];
const STATUS={film:[{id:'watched',label:'✦ watched'},{id:'watching',label:'◎ watching'},{id:'want',label:'+ want to'}],book:[{id:'read',label:'✦ done'},{id:'reading',label:'↻ reading'},{id:'want',label:'+ want to'}],default:[{id:'active',label:'✦ active'},{id:'saved',label:'✧ saved'},{id:'want',label:'+ want to'}]};
const ti=t=>t==='film'?'⟡':t==='book'?'꩜':t==='music'?'∿':t==='youtube'?'▷':t==='podcast'?'◎':'⬡';
const statusLabel=(item)=>{
  if(item.type==='book') return item.status==='read'?'✦ done':item.status==='reading'?'↻ reading':'+ want to';
  return item.status==='watched'?'✦ watched':item.status==='watching'?'◎ watching':item.status==='loved'?'♡ loved':item.status==='active'?'✦ active':'+ want to';
};

function Cover({uri,style,radius=0,children}){
  const [err,setErr]=useState(false);
  return(
    <View style={[style,{borderRadius:radius,overflow:'hidden'}]}>
      {!err&&uri?<Image source={{uri}} style={StyleSheet.absoluteFill} resizeMode="cover" onError={()=>setErr(true)}/>:<LinearGradient colors={['#2d1040','#8b4f9e','#f7a8c4']} style={StyleSheet.absoluteFill}/>}
      {children}
    </View>
  );
}

// ── LIBRARY SCREEN (See All) ──────────────────────────────────────
function Library({items,initialType,onItem,onBack}){
  const [filter,setFilter]=useState(initialType||'all');
  const list=items.filter(i=>filter==='all'||i.type===filter);
  return(
    <View style={{flex:1,backgroundColor:C.bg}}>
      <View style={{paddingTop:52,paddingBottom:8}}>
        <View style={{flexDirection:'row',alignItems:'center',gap:12,paddingHorizontal:16,paddingBottom:12}}>
          <TouchableOpacity onPress={onBack} style={s.iconBtn}><Text style={{color:'#fff',fontSize:22}}>‹</Text></TouchableOpacity>
          <Text style={{color:C.text,fontSize:20,fontWeight:'800'}}>꩜ library</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:16,gap:6}}>
          {FILTERS.map(f=>(
            <TouchableOpacity key={f.id} onPress={()=>setFilter(f.id)} style={[s.chip,filter===f.id&&s.chipOn]}>
              <Text style={[s.chipTxt,filter===f.id&&{color:C.bg}]}>{f.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <FlatList
        data={list} keyExtractor={i=>i.id}
        renderItem={({item})=>(
          <TouchableOpacity onPress={()=>onItem(item)} style={{flexDirection:'row',alignItems:'center',gap:12,backgroundColor:C.card,borderWidth:1,borderColor:C.cardBorder,borderRadius:14,padding:10,marginBottom:6}} activeOpacity={0.8}>
            <Cover uri={item.cover} style={{width:44,height:item.type==='book'?58:44}} radius={10}/>
            <View style={{flex:1}}>
              <Text style={{color:C.text,fontSize:13,fontWeight:'700',marginBottom:2}} numberOfLines={1}>{item.title}</Text>
              <Text style={{color:C.textMuted,fontSize:10,marginBottom:3}}>{item.creator} · {item.year}</Text>
              <View style={{flexDirection:'row',gap:6,alignItems:'center'}}>
                <View style={{backgroundColor:'rgba(201,184,245,0.15)',borderRadius:999,paddingHorizontal:8,paddingVertical:2}}>
                  <Text style={{color:C.lavender,fontSize:9,fontWeight:'600'}}>{statusLabel(item)}</Text>
                </View>
                {item.tags.length>0&&<Text style={{color:C.lavender,fontSize:11}}>{item.tags.join(' ')}</Text>}
              </View>
            </View>
            <Text style={{color:C.textMuted,fontSize:18}}>›</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{paddingHorizontal:16,paddingTop:8,paddingBottom:100}}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

// ── WANT TO LIST (To Watch / To Read) ─────────────────────────────
function WantTo({items,onItem,onBack}){
  const [filter,setFilter]=useState('all');
  const wantItems=items.filter(i=>i.status==='want'||(filter!=='all'&&i.status==='want'));
  const byType={
    all: items.filter(i=>i.status==='want'),
    film: items.filter(i=>i.type==='film'&&i.status==='want'),
    book: items.filter(i=>i.type==='book'&&i.status==='want'),
    music: items.filter(i=>i.type==='music'&&i.status==='want'),
  };
  const list=byType[filter]||byType.all;
  const typeFilters=[{id:'all',label:'✦ all'},{id:'film',label:'⟡ films'},{id:'book',label:'꩜ books'},{id:'music',label:'∿ music'}];
  return(
    <View style={{flex:1,backgroundColor:C.bg}}>
      {/* Hero */}
      <LinearGradient colors={['#1f0a2e','#3d1f5e','#c9b8f5']} start={{x:0,y:0}} end={{x:1,y:1}} style={{paddingTop:52,paddingBottom:24,paddingHorizontal:16}}>
        <TouchableOpacity onPress={onBack} style={{marginBottom:16}}>
          <Text style={{color:'rgba(255,255,255,0.6)',fontSize:13}}>‹ back</Text>
        </TouchableOpacity>
        <Text style={{color:'rgba(255,255,255,0.6)',fontSize:12,marginBottom:4}}>your list ⋆｡°✩</Text>
        <Text style={{color:'#fff',fontSize:26,fontWeight:'800',lineHeight:30,marginBottom:4}}>want to watch,{'\n'}read & listen.</Text>
        <Text style={{color:'rgba(255,255,255,0.5)',fontSize:12}}>{byType.all.length} things waiting for you</Text>
      </LinearGradient>

      {/* Filter tabs */}
      <View style={{paddingHorizontal:16,paddingVertical:14}}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap:8}}>
          {typeFilters.map(f=>(
            <TouchableOpacity key={f.id} onPress={()=>setFilter(f.id)} style={[s.chip,filter===f.id&&s.chipOn]}>
              <Text style={[s.chipTxt,filter===f.id&&{color:C.bg}]}>{f.label} {byType[f.id]?.length>0?`(${byType[f.id].length})`:''}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {list.length===0?(
        <View style={{alignItems:'center',paddingTop:60}}>
          <Text style={{fontSize:32}}>✦</Text>
          <Text style={{color:C.textMuted,fontSize:14,marginTop:12}}>nothing here yet</Text>
          <Text style={{color:C.textMuted,fontSize:12,marginTop:4}}>add things you want to explore</Text>
        </View>
      ):(
        <FlatList
          data={list} keyExtractor={i=>i.id}
          renderItem={({item})=>(
            <TouchableOpacity onPress={()=>onItem(item)} activeOpacity={0.8}
              style={{flexDirection:'row',alignItems:'center',gap:14,padding:12,marginBottom:8,backgroundColor:C.card,borderWidth:1,borderColor:C.cardBorder,borderRadius:16}}>
              <Cover uri={item.cover} style={{width:52,height:item.type==='book'?70:52}} radius={12}/>
              <View style={{flex:1}}>
                <Text style={{color:C.text,fontSize:14,fontWeight:'700',marginBottom:3}} numberOfLines={1}>{item.title}</Text>
                <Text style={{color:C.textMuted,fontSize:11,marginBottom:6}}>{item.creator} · {item.year}</Text>
                <View style={{flexDirection:'row',alignItems:'center',gap:6}}>
                  <Text style={{fontSize:12}}>{ti(item.type)}</Text>
                  <Text style={{color:C.textMuted,fontSize:11}}>{item.type}</Text>
                </View>
              </View>
              <View style={{alignItems:'center',gap:4}}>
                <View style={{width:28,height:28,borderRadius:14,borderWidth:1.5,borderColor:C.lavender,alignItems:'center',justifyContent:'center'}}>
                  <Text style={{color:C.lavender,fontSize:14}}>+</Text>
                </View>
                <Text style={{color:C.textMuted,fontSize:8}}>log it</Text>
              </View>
            </TouchableOpacity>
          )}
          contentContainerStyle={{paddingHorizontal:16,paddingBottom:100}}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

// ── JOURNAL / THOUGHTS SCREEN ─────────────────────────────────────
function Journal({items,onItem,onBack}){
  const withNotes=items.filter(i=>i.note&&i.note.length>0);
  return(
    <View style={{flex:1,backgroundColor:C.bg}}>
      <LinearGradient colors={['#0d2137','#1a3a5e','#a8d8ea']} start={{x:0,y:0}} end={{x:1,y:1}} style={{paddingTop:52,paddingBottom:24,paddingHorizontal:16}}>
        <TouchableOpacity onPress={onBack} style={{marginBottom:16}}>
          <Text style={{color:'rgba(255,255,255,0.6)',fontSize:13}}>‹ back</Text>
        </TouchableOpacity>
        <Text style={{color:'rgba(255,255,255,0.6)',fontSize:12,marginBottom:4}}>your thoughts ˖°</Text>
        <Text style={{color:'#fff',fontSize:26,fontWeight:'800',lineHeight:30}}>reviews &{'\n'}reflections.</Text>
        <Text style={{color:'rgba(255,255,255,0.5)',fontSize:12,marginTop:6}}>{withNotes.length} entries</Text>
      </LinearGradient>

      {withNotes.length===0?(
        <View style={{alignItems:'center',paddingTop:60}}>
          <Text style={{fontSize:32}}>˖°</Text>
          <Text style={{color:C.textMuted,fontSize:14,marginTop:12}}>no reviews yet</Text>
          <Text style={{color:C.textMuted,fontSize:12,marginTop:4}}>add thoughts when you log items</Text>
        </View>
      ):(
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{padding:16,paddingBottom:100,gap:12}}>
          {withNotes.map(item=>(
            <TouchableOpacity key={item.id} onPress={()=>onItem(item)} activeOpacity={0.85}>
              <View style={{backgroundColor:C.card,borderWidth:1,borderColor:C.cardBorder,borderRadius:20,overflow:'hidden'}}>
                {/* Mini hero */}
                <View style={{height:80,overflow:'hidden'}}>
                  <Cover uri={item.cover} style={{flex:1}}>
                    <LinearGradient colors={['transparent','rgba(14,12,26,0.9)']} style={StyleSheet.absoluteFill}/>
                  </Cover>
                  <View style={{position:'absolute',bottom:10,left:12,right:12,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View>
                      <Text style={{color:'#fff',fontWeight:'800',fontSize:14}}>{item.title}</Text>
                      <Text style={{color:'rgba(255,255,255,0.5)',fontSize:11}}>{item.creator}</Text>
                    </View>
                    <View style={{backgroundColor:'rgba(201,184,245,0.9)',paddingHorizontal:8,paddingVertical:3,borderRadius:999}}>
                      <Text style={{color:'#1a1a2e',fontSize:9,fontWeight:'700'}}>{statusLabel(item)}</Text>
                    </View>
                  </View>
                </View>
                {/* Note */}
                <View style={{padding:14}}>
                  <Text style={{color:C.textSub,fontSize:13,lineHeight:20,fontStyle:'italic'}}>"{item.note}"</Text>
                  {item.tags.length>0&&(
                    <View style={{flexDirection:'row',gap:8,marginTop:10}}>
                      {item.tags.map(t=>(
                        <View key={t} style={{backgroundColor:'rgba(201,184,245,0.12)',borderRadius:999,paddingHorizontal:10,paddingVertical:4}}>
                          <Text style={{color:C.lavender,fontSize:11}}>{t}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                  <Text style={{color:C.textMuted,fontSize:10,marginTop:10}}>tap to view full review →</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

// ── BOARD DETAIL ──────────────────────────────────────────────────
function BoardDetail({board,items,onClose}){
  return(
    <View style={{flex:1,backgroundColor:C.bg}}>
      <View style={{height:220,overflow:'hidden'}}>
        <LinearGradient colors={board.gradient} style={StyleSheet.absoluteFill} start={{x:0,y:0}} end={{x:1,y:1}}/>
        <LinearGradient colors={['transparent','rgba(14,12,26,0.9)']} style={StyleSheet.absoluteFill}/>
        {board.images&&(
          <View style={{position:'absolute',top:52,right:16,gap:4}}>
            <View style={{flexDirection:'row',gap:4}}>
              {board.images.slice(0,2).map((img,i)=><Cover key={i} uri={img} style={{width:60,height:80}} radius={10}/>)}
            </View>
          </View>
        )}
        <View style={{flexDirection:'row',justifyContent:'space-between',padding:16,paddingTop:52}}>
          <TouchableOpacity onPress={onClose} style={s.iconBtn}><Text style={{color:'#fff',fontSize:22}}>‹</Text></TouchableOpacity>
        </View>
        <View style={{position:'absolute',bottom:20,left:16,right:160}}>
          <Text style={{color:'rgba(255,255,255,0.5)',fontSize:11,marginBottom:6}}>⬡ lore board</Text>
          <Text style={{color:'#fff',fontSize:22,fontWeight:'800',lineHeight:26}}>{board.title}</Text>
          <Text style={{color:'rgba(255,255,255,0.5)',fontSize:12,marginTop:4}}>{board.desc}</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
        <Text style={[s.lbl,{marginTop:16}]}>items in this board</Text>
        <View style={{flexDirection:'row',gap:6,paddingHorizontal:16}}>
          <View style={{flex:1,gap:6}}>
            {items.filter((_,i)=>i%2===0).slice(0,6).map(item=>(
              <View key={item.id} style={{borderRadius:14,overflow:'hidden',aspectRatio:item.type==='book'?0.67:1}}>
                <Cover uri={item.cover} style={{flex:1}}>
                  <LinearGradient colors={['transparent','rgba(0,0,0,0.65)']} style={StyleSheet.absoluteFill}/>
                  <View style={{position:'absolute',bottom:8,left:8,right:8}}>
                    <Text style={{color:'#fff',fontSize:10,fontWeight:'700'}} numberOfLines={1}>{item.title}</Text>
                  </View>
                </Cover>
              </View>
            ))}
          </View>
          <View style={{flex:1,gap:6}}>
            {items.filter((_,i)=>i%2===1).slice(0,6).map(item=>(
              <View key={item.id} style={{borderRadius:14,overflow:'hidden',aspectRatio:item.type==='book'?0.67:1}}>
                <Cover uri={item.cover} style={{flex:1}}>
                  <LinearGradient colors={['transparent','rgba(0,0,0,0.65)']} style={StyleSheet.absoluteFill}/>
                  <View style={{position:'absolute',bottom:8,left:8,right:8}}>
                    <Text style={{color:'#fff',fontSize:10,fontWeight:'700'}} numberOfLines={1}>{item.title}</Text>
                  </View>
                </Cover>
              </View>
            ))}
          </View>
        </View>
        <View style={{height:100}}/>
      </ScrollView>
    </View>
  );
}

// ── HOME ─────────────────────────────────────────────────────────
function Home({items,onItem,onSeeAll,onWantTo,onJournal}){
  const films=items.filter(i=>i.type==='film').slice(0,4);
  const books=items.filter(i=>i.type==='book').slice(0,5);
  const music=items.filter(i=>['music','youtube','podcast'].includes(i.type)).slice(0,4);
  const withNotes=items.filter(i=>i.note&&i.note.length>0).slice(0,3);
  const wantCount=items.filter(i=>i.status==='want').length;
  const st={
    watched:items.filter(i=>i.status==='watched').length,
    books:items.filter(i=>i.type==='book').length,
    saved:wantCount,
    channels:items.filter(i=>['youtube','podcast'].includes(i.type)).length,
  };
  return(
    <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false} bounces contentContainerStyle={{paddingBottom:20}}>
      {/* Hero + stats */}
      <LinearGradient colors={['#ff9ecb','#c9b8f5','#a8d8ea']} start={{x:0,y:0}} end={{x:1,y:1}} style={{paddingHorizontal:16,paddingTop:54,paddingBottom:24}}>
        <Text style={{color:'rgba(255,255,255,0.75)',fontSize:12,marginBottom:6}}>sunday morning ⋆｡°✩</Text>
        <Text style={{color:'#fff',fontSize:30,fontWeight:'800',lineHeight:34,marginBottom:20}}>your lore,{'\n'}your world.</Text>
        <View style={{backgroundColor:'rgba(255,255,255,0.2)',borderRadius:18,padding:14,flexDirection:'row',alignItems:'center'}}>
          {[['watched',st.watched],['books',st.books],['want to',st.saved],['channels',st.channels]].map(([lb,n],i,arr)=>(
            <React.Fragment key={lb}>
              <View style={{flex:1,alignItems:'center'}}>
                <Text style={{color:'#fff',fontSize:20,fontWeight:'800'}}>{n}</Text>
                <Text style={{color:'rgba(255,255,255,0.65)',fontSize:9,marginTop:2}}>{lb}</Text>
              </View>
              {i<arr.length-1&&<View style={{width:1,height:32,backgroundColor:'rgba(255,255,255,0.3)'}}/>}
            </React.Fragment>
          ))}
        </View>
      </LinearGradient>

      {/* Quick action cards */}
      <View style={{flexDirection:'row',gap:10,paddingHorizontal:16,paddingTop:16,paddingBottom:4}}>
        <TouchableOpacity onPress={onWantTo} activeOpacity={0.85} style={{flex:1,borderRadius:16,overflow:'hidden',height:72}}>
          <LinearGradient colors={['#1f0a2e','#3d1f5e']} style={StyleSheet.absoluteFill}/>
          <View style={{flex:1,padding:12,justifyContent:'space-between'}}>
            <Text style={{color:C.lavender,fontSize:18}}>✦</Text>
            <View>
              <Text style={{color:'#fff',fontSize:12,fontWeight:'700'}}>want to list</Text>
              <Text style={{color:'rgba(255,255,255,0.4)',fontSize:10}}>{wantCount} items waiting</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onJournal} activeOpacity={0.85} style={{flex:1,borderRadius:16,overflow:'hidden',height:72}}>
          <LinearGradient colors={['#0d2137','#1a3a5e']} style={StyleSheet.absoluteFill}/>
          <View style={{flex:1,padding:12,justifyContent:'space-between'}}>
            <Text style={{color:C.sky,fontSize:18}}>˖°</Text>
            <View>
              <Text style={{color:'#fff',fontSize:12,fontWeight:'700'}}>my reviews</Text>
              <Text style={{color:'rgba(255,255,255,0.4)',fontSize:10}}>{withNotes.length} thoughts written</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Films */}
      <View style={{height:16}}/>
      <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:16,marginBottom:10}}>
        <Text style={{color:C.text,fontSize:13,fontWeight:'700'}}>⟡ films & shows</Text>
        <TouchableOpacity onPress={()=>onSeeAll('film')}>
          <Text style={{color:C.lavender,fontSize:11}}>see all →</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection:'row',gap:6,paddingHorizontal:16,marginBottom:6}}>
        <View style={{flex:1,borderRadius:16,overflow:'hidden',height:220}}>
          {films[0]&&(
            <TouchableOpacity onPress={()=>onItem(films[0])} style={{flex:1}} activeOpacity={0.85}>
              <Cover uri={films[0].cover} style={{flex:1}}>
                <LinearGradient colors={['transparent','rgba(0,0,0,0.8)']} style={StyleSheet.absoluteFill}/>
                <View style={{position:'absolute',bottom:10,left:10,right:10,gap:6}}>
                  <Text style={{color:'#fff',fontWeight:'800',fontSize:13}} numberOfLines={2}>{films[0].title}</Text>
                  <View style={{backgroundColor:'rgba(201,184,245,0.92)',paddingHorizontal:8,paddingVertical:3,borderRadius:999,alignSelf:'flex-start'}}>
                    <Text style={{color:'#1a1a2e',fontSize:8,fontWeight:'700'}}>✦ watched</Text>
                  </View>
                </View>
              </Cover>
            </TouchableOpacity>
          )}
        </View>
        <View style={{flex:1,gap:6}}>
          {[films[1],films[2]].map(film=>film&&(
            <TouchableOpacity key={film.id} onPress={()=>onItem(film)} activeOpacity={0.85} style={{height:107,borderRadius:16,overflow:'hidden'}}>
              <Cover uri={film.cover} style={{flex:1}}>
                <LinearGradient colors={['transparent','rgba(0,0,0,0.8)']} style={StyleSheet.absoluteFill}/>
                <View style={{position:'absolute',bottom:8,left:8,right:8,gap:4}}>
                  <Text style={{color:'#fff',fontWeight:'800',fontSize:10}} numberOfLines={1}>{film.title}</Text>
                  <View style={{backgroundColor:film.status==='watching'?'rgba(247,168,196,0.92)':'rgba(255,255,255,0.2)',paddingHorizontal:7,paddingVertical:2,borderRadius:999,alignSelf:'flex-start'}}>
                    <Text style={{color:film.status==='watching'?'#1a1a2e':'#fff',fontSize:8,fontWeight:'700'}}>{film.status==='watching'?'◎ watching':'+ want to'}</Text>
                  </View>
                </View>
              </Cover>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      {films[3]&&(
        <TouchableOpacity onPress={()=>onItem(films[3])} activeOpacity={0.85} style={{marginHorizontal:16,marginBottom:20,borderRadius:16,overflow:'hidden',height:90}}>
          <Cover uri={films[3].cover} style={{flex:1}}>
            <LinearGradient colors={['transparent','rgba(0,0,0,0.8)']} style={StyleSheet.absoluteFill}/>
            <View style={{position:'absolute',bottom:10,left:10,right:10,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
              <Text style={{color:'#fff',fontWeight:'800',fontSize:13}}>{films[3].title}</Text>
              <View style={{backgroundColor:'rgba(247,168,196,0.92)',paddingHorizontal:8,paddingVertical:3,borderRadius:999}}>
                <Text style={{color:'#1a1a2e',fontSize:8,fontWeight:'700'}}>◎ watching</Text>
              </View>
            </View>
          </Cover>
        </TouchableOpacity>
      )}

      {/* Books */}
      <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:16,marginBottom:10}}>
        <Text style={{color:C.text,fontSize:13,fontWeight:'700'}}>꩜ books</Text>
        <TouchableOpacity onPress={()=>onSeeAll('book')}>
          <Text style={{color:C.lavender,fontSize:11}}>see all →</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingLeft:16,paddingBottom:4,gap:10}}>
        {books.map(b=>(
          <TouchableOpacity key={b.id} onPress={()=>onItem(b)} style={{width:90,gap:6}} activeOpacity={0.85}>
            <Cover uri={b.cover} style={{width:90,height:130}} radius={12}>
              <View style={{position:'absolute',left:0,top:0,bottom:0,width:6,backgroundColor:'rgba(0,0,0,0.2)'}}/>
            </Cover>
            <Text style={{color:C.text,fontSize:10,fontWeight:'700',lineHeight:13}} numberOfLines={2}>{b.title}</Text>
            <Text style={{color:C.textMuted,fontSize:9}}>{b.status==='read'?'✦ done':b.status==='reading'?'↻ reading':'+ want'}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={{height:20}}/>

      {/* Music */}
      <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:16,marginBottom:10}}>
        <Text style={{color:C.text,fontSize:13,fontWeight:'700'}}>∿ music & channels</Text>
        <TouchableOpacity onPress={()=>onSeeAll('music')}>
          <Text style={{color:C.lavender,fontSize:11}}>see all →</Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal:16,gap:6}}>
        {music.map(m=>(
          <TouchableOpacity key={m.id} onPress={()=>onItem(m)} style={{flexDirection:'row',alignItems:'center',gap:12,backgroundColor:C.card,borderWidth:1,borderColor:C.cardBorder,borderRadius:16,padding:10}} activeOpacity={0.85}>
            <Cover uri={m.cover} style={{width:46,height:46}} radius={10}/>
            <View style={{flex:1}}>
              <Text style={{color:C.text,fontSize:12,fontWeight:'600'}} numberOfLines={1}>{m.title}</Text>
              <Text style={{color:C.textMuted,fontSize:10}}>{m.creator} · {m.type}</Text>
            </View>
            <Text style={{color:C.lavender,fontSize:14}}>{m.tags.includes('♡')?'♡':'✧'}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{height:20}}/>

      {/* Recent thoughts — CLICKABLE journal entries */}
      {withNotes.length>0&&(
        <>
          <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:16,marginBottom:12}}>
            <Text style={{color:C.text,fontSize:13,fontWeight:'700'}}>˖° recent thoughts</Text>
            <TouchableOpacity onPress={onJournal}>
              <Text style={{color:C.lavender,fontSize:11}}>see all →</Text>
            </TouchableOpacity>
          </View>
          <View style={{paddingHorizontal:16,gap:10}}>
            {withNotes.map(item=>(
              <TouchableOpacity key={item.id} onPress={()=>onItem(item)} activeOpacity={0.85}>
                <View style={{backgroundColor:C.card,borderWidth:1,borderColor:C.cardBorder,borderRadius:20,overflow:'hidden'}}>
                  <View style={{height:72,overflow:'hidden'}}>
                    <Cover uri={item.cover} style={{flex:1}}>
                      <LinearGradient colors={['transparent','rgba(14,12,26,0.9)']} style={StyleSheet.absoluteFill}/>
                    </Cover>
                    <View style={{position:'absolute',bottom:10,left:12,right:12,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                      <Text style={{color:'#fff',fontWeight:'800',fontSize:13}}>{item.title}</Text>
                      <View style={{backgroundColor:'rgba(201,184,245,0.9)',paddingHorizontal:8,paddingVertical:3,borderRadius:999}}>
                        <Text style={{color:'#1a1a2e',fontSize:9,fontWeight:'700'}}>{statusLabel(item)}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{padding:12}}>
                    <Text style={{color:C.textSub,fontSize:12,lineHeight:19,fontStyle:'italic'}} numberOfLines={2}>"{item.note}"</Text>
                    {item.tags.length>0&&<Text style={{color:C.lavender,fontSize:12,marginTop:6}}>{item.tags.join('  ')}</Text>}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
      <View style={{height:120}}/>
    </ScrollView>
  );
}

// ── SEARCH ───────────────────────────────────────────────────────
function Search({items,onItem}){
  const [q,setQ]=useState('');
  const [tf,setTf]=useState('all');
  const list=items.filter(i=>(tf==='all'||i.type===tf)&&(q===''||i.title.toLowerCase().includes(q.toLowerCase())||i.creator.toLowerCase().includes(q.toLowerCase())));
  return(
    <View style={{flex:1}}>
      <View style={{paddingTop:52,paddingBottom:4}}>
        <Text style={{color:C.text,fontSize:22,fontWeight:'800',paddingHorizontal:16,paddingBottom:12}}>⊹ search</Text>
        <View style={{marginHorizontal:16,marginBottom:12,backgroundColor:C.card,borderWidth:1,borderColor:C.cardBorder,borderRadius:16,flexDirection:'row',alignItems:'center',paddingHorizontal:14}}>
          <TextInput style={{flex:1,color:C.text,fontSize:14,paddingVertical:12}} value={q} onChangeText={setQ} placeholder="films, books, music..." placeholderTextColor={C.textMuted} autoCorrect={false} autoCapitalize="none"/>
          {q.length>0&&<TouchableOpacity onPress={()=>setQ('')}><Text style={{color:C.textMuted}}>✕</Text></TouchableOpacity>}
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{paddingHorizontal:16,gap:6,paddingBottom:12}}>
          {FILTERS.map(f=>(
            <TouchableOpacity key={f.id} onPress={()=>setTf(f.id)} style={[s.chip,tf===f.id&&s.chipOn]}>
              <Text style={[s.chipTxt,tf===f.id&&{color:C.bg}]}>{f.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <FlatList data={list} keyExtractor={i=>i.id} renderItem={({item})=>(
        <TouchableOpacity onPress={()=>onItem(item)} style={{flexDirection:'row',alignItems:'center',gap:12,backgroundColor:C.card,borderWidth:1,borderColor:C.cardBorder,borderRadius:14,padding:10,marginBottom:6}} activeOpacity={0.8}>
          <Cover uri={item.cover} style={{width:44,height:item.type==='book'?58:44}} radius={10}/>
          <View style={{flex:1}}>
            <Text style={{color:C.text,fontSize:13,fontWeight:'700',marginBottom:2}} numberOfLines={1}>{item.title}</Text>
            <Text style={{color:C.textMuted,fontSize:10,marginBottom:3}}>{item.creator} · {item.year}</Text>
            {item.tags.length>0&&<Text style={{color:C.lavender,fontSize:12}}>{item.tags.join('  ')}</Text>}
          </View>
          <Text style={{color:C.textMuted,fontSize:18}}>›</Text>
        </TouchableOpacity>
      )} contentContainerStyle={{paddingHorizontal:16,paddingTop:4,paddingBottom:100}} showsVerticalScrollIndicator={false}/>
    </View>
  );
}

// ── ADD ──────────────────────────────────────────────────────────
function Add({onSave,onClose}){
  const [type,setType]=useState('film');
  const [title,setTitle]=useState('');
  const [creator,setCreator]=useState('');
  const [year,setYear]=useState('');
  const [status,setStatus]=useState('want');
  const [note,setNote]=useState('');
  const [tags,setTags]=useState([]);
  const [gi,setGi]=useState(0);
  const opts=STATUS[type]||STATUS.default;
  const toggleTag=t=>setTags(p=>p.includes(t)?p.filter(x=>x!==t):[...p,t]);
  const save=()=>{
    if(!title.trim()){Alert.alert('Add a title first ✦');return;}
    onSave({id:Date.now().toString(),type,title:title.trim(),creator:creator.trim(),year:year.trim(),gradient:GRADIENTS[gi],cover:null,status,tags,note:note.trim()});
  };
  return(
    <ScrollView style={{flex:1}} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
      <View style={{paddingTop:52}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:16}}>
          <TouchableOpacity onPress={onClose}><Text style={{color:C.textMuted,fontSize:18}}>✕</Text></TouchableOpacity>
          <Text style={{color:C.text,fontSize:16,fontWeight:'800'}}>+ add to lore</Text>
          <TouchableOpacity onPress={save} style={{backgroundColor:C.lavender,paddingHorizontal:16,paddingVertical:7,borderRadius:999}}>
            <Text style={{color:C.bg,fontSize:12,fontWeight:'700'}}>save</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginHorizontal:16,height:150,borderRadius:20,overflow:'hidden',justifyContent:'flex-end',padding:16,marginBottom:12}}>
          <LinearGradient colors={GRADIENTS[gi]} style={StyleSheet.absoluteFill} start={{x:0,y:0}} end={{x:1,y:1}}/>
          <LinearGradient colors={['transparent','rgba(0,0,0,0.6)']} style={StyleSheet.absoluteFill}/>
          <Text style={{color:'rgba(255,255,255,0.5)',fontSize:11,marginBottom:4}}>{TYPES.find(t=>t.id===type)?.label}</Text>
          <Text style={{color:'#fff',fontSize:22,fontWeight:'800'}}>{title||'title...'}</Text>
          <Text style={{color:'rgba(255,255,255,0.5)',fontSize:12}}>{creator||'creator'}</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap:8,paddingHorizontal:16,paddingBottom:12}}>
          {GRADIENTS.map((g,i)=>(
            <TouchableOpacity key={i} onPress={()=>setGi(i)}>
              <LinearGradient colors={g} style={{width:28,height:28,borderRadius:14,...(gi===i&&{borderWidth:2,borderColor:'#fff'})}}/>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Text style={s.lbl}>type</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap:6,paddingHorizontal:16,paddingBottom:10}}>
          {TYPES.map(t=>(
            <TouchableOpacity key={t.id} onPress={()=>{setType(t.id);setStatus('want');}} style={[s.chip,type===t.id&&{backgroundColor:C.lavender,borderColor:C.lavender}]}>
              <Text style={[s.chipTxt,type===t.id&&{color:C.bg}]}>{t.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={{paddingHorizontal:16,gap:8,marginBottom:4}}>
          {[['title *',title,setTitle,'e.g. Past Lives'],['creator',creator,setCreator,'author / director'],['year',year,setYear,'2024']].map(([lb,val,fn,ph])=>(
            <View key={lb}>
              <Text style={s.lbl}>{lb}</Text>
              <TextInput style={s.input} value={val} onChangeText={fn} placeholder={ph} placeholderTextColor={C.textMuted}/>
            </View>
          ))}
        </View>
        <Text style={s.lbl}>status</Text>
        <View style={{flexDirection:'row',flexWrap:'wrap',gap:8,paddingHorizontal:16,paddingBottom:10}}>
          {opts.map(o=>(
            <TouchableOpacity key={o.id} onPress={()=>setStatus(o.id)} style={[s.chip,status===o.id&&{backgroundColor:C.lavender,borderColor:C.lavender}]}>
              <Text style={[s.chipTxt,status===o.id&&{color:C.bg}]}>{o.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={s.lbl}>how did it feel?</Text>
        <View style={{flexDirection:'row',flexWrap:'wrap',gap:8,paddingHorizontal:16,paddingBottom:10}}>
          {[['♡','♡ recommend'],['⋆｡°✩','⋆｡°✩ memorable'],['↻','↻ revisit']].map(([k,lb])=>(
            <TouchableOpacity key={k} onPress={()=>toggleTag(k)} style={[s.chip,tags.includes(k)&&{backgroundColor:'rgba(201,184,245,0.2)',borderColor:C.lavender}]}>
              <Text style={[s.chipTxt,tags.includes(k)&&{color:C.lavender}]}>{lb}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={s.lbl}>thoughts</Text>
        <TextInput style={[s.input,{marginHorizontal:16,minHeight:90,textAlignVertical:'top'}]} value={note} onChangeText={setNote} placeholder="any thoughts, feelings, memories..." placeholderTextColor={C.textMuted} multiline/>
        <View style={{height:60}}/>
      </View>
    </ScrollView>
  );
}

// ── DETAIL ───────────────────────────────────────────────────────
function Detail({item,onUpdate,onDelete,onClose}){
  const [note,setNote]=useState(item.note||'');
  const [edit,setEdit]=useState(false);
  const opts=STATUS[item.type]||STATUS.default;
  const toggleTag=t=>onUpdate({...item,tags:item.tags.includes(t)?item.tags.filter(x=>x!==t):[...item.tags,t]});
  return(
    <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
      <View style={{height:340,overflow:'hidden'}}>
        <Cover uri={item.cover} style={{flex:1,height:340}}>
          <LinearGradient colors={['rgba(14,12,26,0.2)','rgba(14,12,26,0.97)']} style={StyleSheet.absoluteFill}/>
        </Cover>
        <View style={{position:'absolute',top:0,left:0,right:0,flexDirection:'row',justifyContent:'space-between',padding:16,paddingTop:52}}>
          <TouchableOpacity onPress={onClose} style={s.iconBtn}><Text style={{color:'#fff',fontSize:22}}>‹</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>Alert.alert('Remove?','',
            [{text:'Cancel',style:'cancel'},{text:'Remove',style:'destructive',onPress:()=>{onDelete(item.id);onClose();}}])}
            style={[s.iconBtn,{backgroundColor:'rgba(255,255,255,0.1)'}]}>
            <Text style={{color:'rgba(255,255,255,0.5)',fontSize:14}}>✕</Text>
          </TouchableOpacity>
        </View>
        <View style={{position:'absolute',bottom:20,left:16,right:16}}>
          <Text style={{color:'rgba(255,255,255,0.5)',fontSize:11,marginBottom:6}}>{ti(item.type)} {item.type}</Text>
          <Text style={{color:'#fff',fontSize:26,fontWeight:'800',lineHeight:30,marginBottom:6}}>{item.title}</Text>
          <Text style={{color:'rgba(255,255,255,0.5)',fontSize:13}}>{item.creator}{item.year?` · ${item.year}`:''}</Text>
        </View>
      </View>
      <View style={{padding:16}}>
        <Text style={s.lbl}>status</Text>
        <View style={{flexDirection:'row',flexWrap:'wrap',gap:8,marginBottom:16}}>
          {opts.map(o=>(
            <TouchableOpacity key={o.id} onPress={()=>onUpdate({...item,status:o.id})} style={[s.chip,item.status===o.id&&{backgroundColor:C.lavender,borderColor:C.lavender}]}>
              <Text style={[s.chipTxt,item.status===o.id&&{color:C.bg}]}>{o.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={s.lbl}>how did it feel?</Text>
        <View style={{flexDirection:'row',flexWrap:'wrap',gap:8,marginBottom:16}}>
          {[['♡','♡ recommend'],['⋆｡°✩','⋆｡°✩ memorable'],['↻','↻ revisit']].map(([k,lb])=>(
            <TouchableOpacity key={k} onPress={()=>toggleTag(k)} style={[s.chip,item.tags.includes(k)&&{backgroundColor:'rgba(201,184,245,0.2)',borderColor:C.lavender}]}>
              <Text style={[s.chipTxt,item.tags.includes(k)&&{color:C.lavender}]}>{lb}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
          <Text style={s.lbl}>thoughts</Text>
          <TouchableOpacity onPress={()=>{if(edit)onUpdate({...item,note});setEdit(!edit);}}>
            <Text style={{color:C.lavender,fontSize:11}}>{edit?'save ✦':'edit ·'}</Text>
          </TouchableOpacity>
        </View>
        {edit
          ?<TextInput style={[s.input,{minHeight:90,textAlignVertical:'top'}]} value={note} onChangeText={setNote} multiline autoFocus placeholderTextColor={C.textMuted}/>
          :<TouchableOpacity onPress={()=>setEdit(true)} style={[s.input,{minHeight:70}]}>
            <Text style={{color:item.note?C.textSub:C.textMuted,fontSize:14,lineHeight:22,fontStyle:item.note?'normal':'italic'}}>{item.note||'tap to add thoughts...'}</Text>
          </TouchableOpacity>
        }
      </View>
      <View style={{height:80}}/>
    </ScrollView>
  );
}

// ── BOARDS ───────────────────────────────────────────────────────
function Boards({items,onBoardPress}){
  const [boards,setBoards]=useState(INITIAL_BOARDS);
  const [creating,setCreating]=useState(false);
  const [title,setTitle]=useState('');
  const [desc,setDesc]=useState('');
  const [gi,setGi]=useState(0);
  const BG=[['#ff9ecb','#c9b8f5'],['#ffd6a5','#ffb3c6'],['#1f0a2e','#c9b8f5'],['#a8d8ea','#c5f0c0']];
  const create=()=>{
    if(!title.trim())return;
    setBoards(p=>[{id:Date.now().toString(),title:title.trim(),desc:desc.trim(),gradient:BG[gi],images:[]}, ...p]);
    setCreating(false);setTitle('');setDesc('');
  };
  return(
    <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
      <View style={{paddingTop:52}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',padding:16}}>
          <Text style={{color:C.text,fontSize:22,fontWeight:'800'}}>⬡ lore boards</Text>
          <TouchableOpacity onPress={()=>setCreating(!creating)} style={{backgroundColor:C.lavender,paddingHorizontal:14,paddingVertical:7,borderRadius:999}}>
            <Text style={{color:C.bg,fontSize:12,fontWeight:'700'}}>{creating?'✕':'+ new'}</Text>
          </TouchableOpacity>
        </View>
        {creating&&(
          <View style={{margin:16,gap:10}}>
            <View style={{height:90,borderRadius:20,overflow:'hidden',justifyContent:'flex-end',padding:14}}>
              <LinearGradient colors={BG[gi]} style={StyleSheet.absoluteFill}/>
              <Text style={{color:'#fff',fontSize:18,fontWeight:'800'}}>{title||'board title...'}</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap:8}}>
              {BG.map((g,i)=>(
                <TouchableOpacity key={i} onPress={()=>setGi(i)}>
                  <LinearGradient colors={g} style={{width:28,height:28,borderRadius:14,...(gi===i&&{borderWidth:2,borderColor:'#fff'})}}/>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TextInput style={s.input} value={title} onChangeText={setTitle} placeholder="board title..." placeholderTextColor={C.textMuted}/>
            <TextInput style={s.input} value={desc} onChangeText={setDesc} placeholder="description..." placeholderTextColor={C.textMuted}/>
            <TouchableOpacity onPress={create} style={{backgroundColor:C.lavender,padding:13,borderRadius:999,alignItems:'center'}}>
              <Text style={{color:C.bg,fontSize:13,fontWeight:'700'}}>create board ✦</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{flexDirection:'row',flexWrap:'wrap',padding:16,gap:10}}>
          {boards.map(b=>(
            <TouchableOpacity key={b.id} style={{width:(width-42)/2}} activeOpacity={0.8} onPress={()=>onBoardPress(b)}>
              <View style={{borderRadius:20,overflow:'hidden',minHeight:200}}>
                <LinearGradient colors={b.gradient} style={StyleSheet.absoluteFill}/>
                <LinearGradient colors={['transparent','rgba(0,0,0,0.55)']} style={StyleSheet.absoluteFill}/>
                {b.images&&b.images.length>0?(
                  <View style={{padding:10,gap:4}}>
                    <View style={{flexDirection:'row',gap:4}}>
                      {b.images.slice(0,2).map((img,i)=><Cover key={i} uri={img} style={{flex:1,height:70}} radius={8}/>)}
                    </View>
                    <View style={{flexDirection:'row',gap:4}}>
                      {b.images.slice(2,4).map((img,i)=><Cover key={i} uri={img} style={{flex:1,height:70}} radius={8}/>)}
                    </View>
                  </View>
                ):(
                  <View style={{padding:10,gap:4}}>
                    {[[0,1],[2,3]].map((row,ri)=>(
                      <View key={ri} style={{flexDirection:'row',gap:4}}>
                        {row.map(i=><View key={i} style={{flex:1,height:70,borderRadius:8,backgroundColor:`rgba(255,255,255,${0.08+i*0.04})`}}/>)}
                      </View>
                    ))}
                  </View>
                )}
                <View style={{padding:12,paddingTop:4}}>
                  <Text style={{color:'#fff',fontWeight:'700',fontSize:13}}>{b.title}</Text>
                  <Text style={{color:'rgba(255,255,255,0.5)',fontSize:10,marginTop:2}} numberOfLines={1}>{b.desc}</Text>
                  <Text style={{color:'rgba(255,255,255,0.3)',fontSize:9,marginTop:6}}>tap to explore →</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={{height:100}}/>
    </ScrollView>
  );
}

// ── PROFILE ──────────────────────────────────────────────────────
function Profile({items,onItem,onWantTo,onJournal}){
  const ts=[{icon:'♡',label:'recommend',count:items.filter(i=>i.tags.includes('♡')).length},{icon:'⋆｡°✩',label:'memorable',count:items.filter(i=>i.tags.includes('⋆｡°✩')).length},{icon:'↻',label:'revisit',count:items.filter(i=>i.tags.includes('↻')).length}];
  const bd=[{type:'film',label:'⟡ films',g:['#2d1040','#8b4f9e']},{type:'book',label:'꩜ books',g:['#ffd6a5','#ffb3c6']},{type:'music',label:'∿ music',g:['#c9b8f5','#f7a8c4']},{type:'youtube',label:'▷ youtube',g:['#a8d8ea','#c5f0c0']}].map(t=>({...t,count:items.filter(i=>i.type===t.type).length})).filter(t=>t.count>0);
  const withNotes=items.filter(i=>i.note&&i.note.length>0);
  return(
    <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#1f0a2e','#2d1040','#4a1f6e']} style={{paddingBottom:24,paddingTop:52}}>
        <View style={{alignItems:'center'}}>
          <LinearGradient colors={['#c9b8f5','#f7a8c4']} style={{width:80,height:80,borderRadius:40,alignItems:'center',justifyContent:'center'}}>
            <Text style={{fontSize:28,color:'#fff',fontWeight:'800'}}>A</Text>
          </LinearGradient>
          <Text style={{color:'#fff',fontSize:18,fontWeight:'800',marginTop:12}}>@yourusername</Text>
          <Text style={{color:'rgba(255,255,255,0.4)',fontSize:12,textAlign:'center',paddingHorizontal:40,marginTop:4}}>someone who reads at midnight and cries at films ˖°</Text>
          <View style={{flexDirection:'row',gap:32,marginTop:20,paddingTop:20,borderTopWidth:1,borderTopColor:'rgba(255,255,255,0.08)'}}>
            {[['total',items.length],['following',8],['followers',12]].map(([lb,n])=>(
              <View key={lb} style={{alignItems:'center'}}>
                <Text style={{color:'#fff',fontSize:20,fontWeight:'800'}}>{n}</Text>
                <Text style={{color:'rgba(255,255,255,0.4)',fontSize:10}}>{lb}</Text>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>

      <View style={{padding:16}}>
        {/* Quick links */}
        <View style={{flexDirection:'row',gap:10,marginBottom:16}}>
          <TouchableOpacity onPress={onWantTo} activeOpacity={0.85} style={{flex:1,borderRadius:16,overflow:'hidden',height:64}}>
            <LinearGradient colors={['#1f0a2e','#3d1f5e']} style={StyleSheet.absoluteFill}/>
            <View style={{flex:1,padding:12,flexDirection:'row',alignItems:'center',gap:8}}>
              <Text style={{color:C.lavender,fontSize:20}}>✦</Text>
              <View>
                <Text style={{color:'#fff',fontSize:12,fontWeight:'700'}}>want to list</Text>
                <Text style={{color:'rgba(255,255,255,0.4)',fontSize:10}}>{items.filter(i=>i.status==='want').length} items</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onJournal} activeOpacity={0.85} style={{flex:1,borderRadius:16,overflow:'hidden',height:64}}>
            <LinearGradient colors={['#0d2137','#1a3a5e']} style={StyleSheet.absoluteFill}/>
            <View style={{flex:1,padding:12,flexDirection:'row',alignItems:'center',gap:8}}>
              <Text style={{color:C.sky,fontSize:20}}>˖°</Text>
              <View>
                <Text style={{color:'#fff',fontSize:12,fontWeight:'700'}}>my reviews</Text>
                <Text style={{color:'rgba(255,255,255,0.4)',fontSize:10}}>{withNotes.length} entries</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Recently logged */}
        <Text style={s.lbl}>recently logged</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{gap:8,paddingBottom:4}}>
          {items.slice(0,10).map(item=>(
            <TouchableOpacity key={item.id} onPress={()=>onItem(item)} style={{gap:4,width:60}} activeOpacity={0.8}>
              <Cover uri={item.cover} style={{width:60,height:item.type==='book'?80:60}} radius={10}/>
              <Text style={{color:C.textMuted,fontSize:8,textAlign:'center'}} numberOfLines={1}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={s.lbl}>your feelings</Text>
        <View style={{flexDirection:'row',gap:10,marginBottom:16}}>
          {ts.map(t=>(
            <View key={t.icon} style={[s.glass,{flex:1,alignItems:'center',padding:14,gap:4}]}>
              <Text style={{fontSize:16,color:C.lavender}}>{t.icon}</Text>
              <Text style={{color:'#fff',fontSize:18,fontWeight:'800'}}>{t.count}</Text>
              <Text style={{color:C.textMuted,fontSize:9}}>{t.label}</Text>
            </View>
          ))}
        </View>

        <Text style={s.lbl}>lore breakdown</Text>
        <View style={{flexDirection:'row',flexWrap:'wrap',gap:8,marginBottom:16}}>
          {bd.map(t=>(
            <View key={t.type} style={{width:'30%',borderRadius:14,overflow:'hidden',padding:12,minHeight:70,justifyContent:'space-between'}}>
              <LinearGradient colors={t.g} style={StyleSheet.absoluteFill}/>
              <Text style={{color:'rgba(255,255,255,0.7)',fontSize:10}}>{t.label}</Text>
              <Text style={{color:'#fff',fontSize:22,fontWeight:'800'}}>{t.count}</Text>
            </View>
          ))}
        </View>

        {/* Clickable recent thoughts */}
        {withNotes.length>0&&(
          <>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
              <Text style={s.lbl}>recent thoughts</Text>
              <TouchableOpacity onPress={onJournal}><Text style={{color:C.lavender,fontSize:11}}>see all →</Text></TouchableOpacity>
            </View>
            {withNotes.slice(0,2).map(item=>(
              <TouchableOpacity key={item.id} onPress={()=>onItem(item)} activeOpacity={0.85} style={{flexDirection:'row',gap:12,backgroundColor:C.card,borderWidth:1,borderColor:C.cardBorder,borderRadius:14,padding:12,marginBottom:8}}>
                <Cover uri={item.cover} style={{width:44,height:56}} radius={10}/>
                <View style={{flex:1}}>
                  <Text style={{color:C.text,fontSize:13,fontWeight:'700',marginBottom:4}}>{item.title}</Text>
                  <Text style={{color:C.textSub,fontSize:12,lineHeight:17,fontStyle:'italic'}} numberOfLines={2}>"{item.note}"</Text>
                  {item.tags.length>0&&<Text style={{color:C.lavender,fontSize:11,marginTop:4}}>{item.tags.join('  ')}</Text>}
                </View>
              </TouchableOpacity>
            ))}
          </>
        )}
      </View>
      <View style={{height:100}}/>
    </ScrollView>
  );
}

// ── ROOT ─────────────────────────────────────────────────────────
const TABS=[{id:'home',icon:'✦',label:'home'},{id:'search',icon:'⊹',label:'search'},{id:'add',icon:'+',label:'',fab:true},{id:'boards',icon:'⬡',label:'boards'},{id:'profile',icon:'ᯓ★',label:'me'}];

export default function App(){
  const [tab,setTab]=useState('home');
  const [items,setItems]=useState(ITEMS);
  const [detail,setDetail]=useState(null);
  const [showAdd,setShowAdd]=useState(false);
  const [boardDetail,setBoardDetail]=useState(null);
  const [showLibrary,setShowLibrary]=useState(null);
  const [showWantTo,setShowWantTo]=useState(false);
  const [showJournal,setShowJournal]=useState(false);

  const update=u=>setItems(p=>p.map(i=>i.id===u.id?u:i));
  const del=id=>setItems(p=>p.filter(i=>i.id!==id));
  const save=item=>{setItems(p=>[item,...p]);setShowAdd(false);};

  // Screen stack — order matters
  if(boardDetail) return <View style={s.root}><StatusBar barStyle="light-content"/><BoardDetail board={boardDetail} items={items} onClose={()=>setBoardDetail(null)}/></View>;
  if(detail){const live=items.find(i=>i.id===detail.id)||detail;return <View style={s.root}><StatusBar barStyle="light-content"/><Detail item={live} onUpdate={update} onDelete={del} onClose={()=>setDetail(null)}/></View>;}
  if(showAdd) return <View style={s.root}><StatusBar barStyle="light-content"/><Add onSave={save} onClose={()=>setShowAdd(false)}/></View>;
  if(showLibrary) return <View style={s.root}><StatusBar barStyle="light-content"/><Library items={items} initialType={showLibrary} onItem={i=>{setShowLibrary(null);setDetail(i);}} onBack={()=>setShowLibrary(null)}/></View>;
  if(showWantTo) return <View style={s.root}><StatusBar barStyle="light-content"/><WantTo items={items} onItem={i=>{setShowWantTo(false);setDetail(i);}} onBack={()=>setShowWantTo(false)}/></View>;
  if(showJournal) return <View style={s.root}><StatusBar barStyle="light-content"/><Journal items={items} onItem={i=>{setShowJournal(false);setDetail(i);}} onBack={()=>setShowJournal(false)}/></View>;

  return(
    <View style={s.root}>
      <StatusBar barStyle="light-content"/>
      <View style={{flex:1}}>
        {tab==='home'&&<Home items={items} onItem={setDetail} onSeeAll={t=>{setShowLibrary(t);}} onWantTo={()=>setShowWantTo(true)} onJournal={()=>setShowJournal(true)}/>}
        {tab==='search'&&<Search items={items} onItem={setDetail}/>}
        {tab==='boards'&&<Boards items={items} onBoardPress={setBoardDetail}/>}
        {tab==='profile'&&<Profile items={items} onItem={setDetail} onWantTo={()=>setShowWantTo(true)} onJournal={()=>setShowJournal(true)}/>}
      </View>
      <View style={s.tabBar}>
        {TABS.map(t=>{
          if(t.fab)return(<TouchableOpacity key="fab" onPress={()=>setShowAdd(true)} style={s.fab} activeOpacity={0.85}><Text style={{fontSize:26,color:C.bg,lineHeight:30}}>+</Text></TouchableOpacity>);
          return(<TouchableOpacity key={t.id} onPress={()=>setTab(t.id)} style={{flex:1,alignItems:'center',gap:3}}>
            <Text style={{fontSize:15,color:tab===t.id?C.lavender:'rgba(255,255,255,0.25)'}}>{t.icon}</Text>
            <Text style={{fontSize:8,color:tab===t.id?'rgba(201,184,245,0.8)':'rgba(255,255,255,0.25)',fontWeight:'500'}}>{t.label}</Text>
          </TouchableOpacity>);
        })}
      </View>
    </View>
  );
}

const s=StyleSheet.create({
  root:{flex:1,backgroundColor:C.bg},
  glass:{backgroundColor:'rgba(255,255,255,0.06)',borderWidth:1,borderColor:'rgba(255,255,255,0.1)',borderRadius:20},
  chip:{paddingHorizontal:13,paddingVertical:6,borderRadius:999,backgroundColor:'rgba(255,255,255,0.07)',borderWidth:1,borderColor:'rgba(255,255,255,0.08)'},
  chipOn:{backgroundColor:'#fff',borderColor:'#fff'},
  chipTxt:{fontSize:10,fontWeight:'600',color:'rgba(255,255,255,0.4)'},
  lbl:{color:'rgba(255,255,255,0.25)',fontSize:10,fontWeight:'600',letterSpacing:0.1,textTransform:'uppercase',paddingTop:4,paddingBottom:8},
  input:{color:'rgba(255,255,255,0.92)',fontSize:14,backgroundColor:'rgba(255,255,255,0.05)',borderWidth:1,borderColor:'rgba(255,255,255,0.08)',borderRadius:14,paddingHorizontal:14,paddingVertical:11},
  tabBar:{flexDirection:'row',alignItems:'center',backgroundColor:'rgba(14,12,26,0.97)',borderTopWidth:1,borderTopColor:'rgba(255,255,255,0.07)',paddingTop:10,paddingBottom:28,paddingHorizontal:8},
  fab:{width:44,height:44,borderRadius:22,backgroundColor:'#c9b8f5',alignItems:'center',justifyContent:'center',marginTop:-12},
  iconBtn:{width:36,height:36,borderRadius:18,backgroundColor:'rgba(255,255,255,0.15)',alignItems:'center',justifyContent:'center'},
});
