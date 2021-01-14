<template>
  <f7-page v-if="$f7.data.id" name="home">
    <!-- Top Navbar -->
    <f7-navbar>
      <f7-nav-left>
        <f7-link icon-ios="f7:menu" icon-aurora="f7:menu" icon-md="material:menu" panel-toggle="left"></f7-link>
      </f7-nav-left>

      <f7-nav-title v-if="$f7.data.units[$f7.data.id]!=undefined">{{ $f7.data.units[$f7.data.id].plant }}</f7-nav-title>

      <f7-nav-right v-if="$f7.data.input.t12000">
        <f7-link icon-ios="material:notifications" icon-aurora="material:notifications" icon-md="material:notifications" panel-open="right"></f7-link>
      </f7-nav-right>

      <!-- <f7-nav-right>
        <f7-icon style="padding:0 16px" material="cloud_off" v-if="!$f7.online"></f7-icon>
      </f7-nav-right> -->
    </f7-navbar>

    <!-- Page content-->
    <f7-block style="margin-top: 12px">
      <f7-row no-gap style="justify-content: left">

        <f7-col width="100" small="50" medium="33" large="25" v-if="$f7.data.input.t16620!=='bb000000'">
          <f7-card class="demo-card-header-pic card">
            <f7-card-header v-bind:class="'no-border radial-gradient'+$f7.data.input.t10042" valign="bottom">
              
              <span style="position:absolute; top:18px; left:20px; font-size: 0.8em">{{ $f7.data.input.t09001 }}</span>
              <span style="position:absolute; top:32px; left:20px; font-size: 1.0em">{{ $f7.data.input.t09006.substr(0,5) }}</span>
              
              <span class="temp" style="position:absolute; bottom:5px; left:55px; font-size: 1.5em">{{ ($f7.data.input.t10011/10).toFixed(1) }}</span>
              <span class="icon-home" style="position:absolute; bottom:10px; left:20px; font-size: 1.9em"></span>
              
              <span class="temp" style="position:absolute; top:5px; right:20px; font-size: 2.8em">{{ ($f7.data.input.t10003/10).toFixed(1) }}</span>               
              <span class="humi" style="position:absolute; top:60px; right:20px; font-size: 1.5em">{{ ($f7.data.input.t10004/10).toFixed(1) }}</span>
            </f7-card-header>

            <f7-card-content>
              <h2 class="clkAction" @click="setName()" @taphold="setName()">{{ $f7.data.input.t20001 }}</h2>
              
              <span class="set temp" style="font-size:1.5em">{{ ($f7.data.input.t10101/10).toFixed(1) }}</span>
              <span style="float:right; font-size:2em" v-bind:class="icon_mode($f7.data.input.t18001)"></span>

            </f7-card-content>
            <f7-card-footer>
              <f7-link popup-open="#set-value" @click="setIndex(($f7.data.input.t10105===2)*1)">{{ $t('message.set') }}</f7-link>
              <f7-link v-if="$f7.data.input.t18001===3" popup-open="#set-schedule" @click="setIndex(0)">{{ $t('message.schedule') }}</f7-link>
              <f7-link popup-open="#set-mode" @click="setIndex(0)">{{ $t('message.mode') }}</f7-link>
            </f7-card-footer>
          </f7-card>

        </f7-col>

        <f7-col width="100" small="50" medium="33" large="25" v-if="$f7.data.input.t16620!=='bb000000'">
          <f7-card class="demo-card-header-pic card">
            <f7-card-header v-bind:class="'no-border radial-gradient'+$f7.data.input.t10042" valign="bottom">
              <span style="position:absolute; top:20px; right:20px" :class="icon_status()"></span>

              <span style="position:absolute; bottom:10px; left:20px;">
                <img v-if="$f7.data.input.t10110>0" src="static/img/mix.png" style="width:140px">
                <img v-else src="static/img/mix0.png" style="width:140px">
              </span>

              <span v-if="$f7.data.input.t10110>0" class="valv" style="position:absolute; bottom:72px; left:36px; font-size: 1em">{{ $f7.data.input.t10051 }}</span>
              <span class="pump" style="position:absolute; bottom:66px; left:86px; font-size: 1em">{{ off_on[$f7.data.input.t10031] }}</span> 
              
              <span class="temp" style="position:absolute; bottom:43px; left:165px; font-size: 1em">{{ ($f7.data.input.t10001/10).toFixed(1) }}</span>               
              <span class="temp" style="position:absolute; bottom:8px; left:165px; font-size: 1em">{{ ($f7.data.input.t10002/10).toFixed(1) }}</span>

              <span v-if="$f7.data.input.t10042===0" class="temp avg" style="position:absolute; bottom:66px; left:175px; font-size:1em">{{ (($f7.data.input.t10001+$f7.data.input.t10002)/20).toFixed(1) }}</span>
              <span v-if="$f7.data.input.t10042===1" class="temp" style="position:absolute; bottom:66px; left:175px; font-size:1em"><f7-icon style="margin-bottom:0.2em; font-size:0.8em" f7="drop"></f7-icon>{{ (($f7.data.input.t10106)/10).toFixed(1) }}</span>
            </f7-card-header>

            <f7-card-content>
              <h2 style="margin-block-start:0">{{ $t('message.circuit') }}</h2>
              <span class="set temp" :class="{ 'avg' : $f7.data.input.t10042===0 }" style="font-size:1.5em">{{ ($f7.data.input.t10102/10).toFixed(1) }}</span>
            </f7-card-content>
            <f7-card-footer>
              <f7-link v-if="$f7.data.input.t10042===0" popup-open="#set-circuito" @click="setIndex(0); updateChart()">{{ $t('message.set') }}</f7-link>
              <f7-link @click="showState()">{{ $t('message.state') }}</f7-link>
            </f7-card-footer>
          </f7-card>

        </f7-col>

        <f7-col width="100" small="50" medium="33" large="25" v-if="$f7.data.input.t10013>0 || $f7.data.dev">
          <f7-card class="demo-card-header-pic card">
            <f7-card-header v-bind:class="'no-border radial-gradient'+$f7.data.input.t10042" valign="bottom">

              <span style="position:absolute; bottom:10px; left:20px;">
                <img src="static/img/dhw.png" style="height:70px">
              </span>

              <span class="pump" style="position:absolute; bottom:70px; left:90px; font-size: 1em">{{ off_on[$f7.data.input.t10048] }}</span> 
              <span class="temp" style="position:absolute; bottom:43px; left:100px; font-size: 1em">{{ ($f7.data.input.t10013/10).toFixed(1) }}</span>               
              <span class="pump" style="position:absolute; bottom:15px; left:110px; font-size: 1em">{{ off_on[$f7.data.input.t10049] }}</span> 
          </f7-card-header>

            <f7-card-content>
              <h2 style="margin-block-start:0">{{ $t('message.dhw') }}</h2>
              <span class="set temp" style="font-size:1.5em">{{ ($f7.data.input.t17419/10).toFixed(1) }}</span>

              <span style="float:right; font-size:2em" class="icon-clock"></span>
              <span class="clkAction" @click="setScheduleNr()" style="float:right; font-size:1.5em; margin-right:5px">{{ $f7.data.input.t17425 }}</span>
            </f7-card-content>
            <f7-card-footer>
              <f7-link popup-open="#set-value-dhw" @click="setDhw(0)">{{ $t('message.set') }}</f7-link>
              <f7-link v-if="$f7.data.input.t17425>0" popup-open="#set-schedule" @click="setDhw(0)">{{ $t('message.schedule') }}</f7-link>
            </f7-card-footer>
          </f7-card>

        </f7-col>

        <f7-col width="100" small="50" medium="33" large="25" v-if="$f7.data.input.t10108>0 || $f7.data.dev">
          <f7-card class="demo-card-header-pic card">
            <f7-card-header v-bind:class="'no-border radial-gradient'+$f7.data.input.t10042" valign="bottom">
              <f7-icon v-if="$f7.data.input.t10515>0" f7="exclamationmark_triangle" style="float:right"></f7-icon> 

              <span style="position:absolute; bottom:15px; left:40px;">
                <img src="static/img/uvr.png" style="height:60px">
              </span>

              <span class="pump" style="position:absolute; bottom:72px; left:88px; font-size: 1em">{{ off_on[$f7.data.input.t10078] }}</span> 
              <span class="temp" style="position:absolute; bottom:55px; left:20px; font-size: 1em">{{ ($f7.data.input.t10011/10).toFixed(1) }}</span>               
              <span class="valv" style="position:absolute; bottom:5px; left:90px; font-size: 1em">{{ $f7.data.input.t10054 }}</span>

              <span class="temp" style="position:absolute; bottom:55px; left:135px; font-size: 1em">{{ ($f7.data.input.t10003/10).toFixed(1) }}</span>               
              <span class="humi" style="position:absolute; bottom:35px; left:135px; font-size: 1em">{{ ($f7.data.input.t10004/10).toFixed(1) }}</span>
              <span class="co2" style="position:absolute; bottom:15px; left:135px; font-size: 1em" v-if="$f7.data.input.t10005>-1">{{ $f7.data.input.t10005 }}</span>
            </f7-card-header>

            <f7-card-content>
              <h2 style="margin-block-start:0">{{ $t('message.uvr') }}</h2>
              <span style="float:right; font-size:2em" v-bind:class="icon_uvr($f7.data.input.t18091)"></span>
              <span style="float:right; font-size:1.5em; margin-right:5px">{{ uvr[$f7.data.input.t18091] }}</span>
            </f7-card-content>
            
            <f7-card-footer>
              <f7-link></f7-link>
              <f7-link popup-open="#set-mode-uvr" @click="setModeUvr()">{{ $t('message.mode') }}</f7-link> 
            </f7-card-footer>
          </f7-card>

        </f7-col>

      </f7-row>
    </f7-block>

    <!-- Popup -->
    <f7-popup id="set-value">
      <f7-view>
        <f7-page name="set-value">
          <f7-navbar>
            <f7-nav-title>{{ $t('message.set') }}</f7-nav-title>
            <f7-nav-right>
              <f7-link popup-close><f7-icon material="clear"></f7-icon></f7-link>
            </f7-nav-right>
          </f7-navbar>

          <f7-block-title large style="text-align:center">{{ $f7.data.input.t20001 }}</f7-block-title>
          <f7-block style="text-align:center; font-size:5em;">
              <span class="temp">{{ (setv/10).toFixed(1) }}</span>
          </f7-block>

          <f7-block style="margin:10px auto; width:90%">
            <f7-row tag="p">
              <f7-col tag="span">
                <f7-button large raised round @click="setValue(-5)"><span class="icon-minus"></span></f7-button>
              </f7-col>
              <f7-col tag="span">
                <f7-button large raised round @click="setValue(5)"><span class="icon-plus"></span></f7-button>
              </f7-col>
            </f7-row>
          </f7-block>

          <f7-block style="margin:10px auto 20px; width:90%">
            <f7-row tag="p">
              <f7-col tag="span">
                <f7-button large raised round @click="setIndex(0)" :fill="n === 0"><span class="icon-sun"></span></f7-button>
              </f7-col>
              <f7-col tag="span">
                <f7-button large raised round @click="setIndex(1)" :fill="n === 1"><span class="icon-moon"></span></f7-button>
              </f7-col>
            </f7-row>
          </f7-block>

          <f7-block style="margin:0 auto; width:80%">
            <f7-button large raised fill round popup-close @click="writeValue(n)">OK</f7-button>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

    <f7-popup id="set-mode">
      <f7-view>
        <f7-page name="set-mode">
          <f7-navbar>
            <f7-nav-title>{{ $t('message.mode') }}</f7-nav-title>
            <f7-nav-right>
              <f7-link popup-close><f7-icon material="clear"></f7-icon></f7-link>
            </f7-nav-right>
          </f7-navbar>

          <f7-block-title large style="text-align:center">{{ $f7.data.input.t20001 }}</f7-block-title>
          <f7-block>
            <f7-list>
              <f7-list-item color="blue" radio title="AUTO" name="mode0" value="3" :checked="mode === 3" @change="mode = $event.target.value"></f7-list-item>
              <f7-list-item color="blue" radio title="COMFORT" name="mode0" value="1" :checked="mode === 1" @change="mode = $event.target.value"></f7-list-item>
              <f7-list-item color="blue" radio title="ECO" name="mode0" value="2" :checked="mode === 2" @change="mode = $event.target.value"></f7-list-item>
              <f7-list-item color="blue" radio title="OFF" name="mode0" value="0" :checked="mode === 0" @change="mode = $event.target.value"></f7-list-item>
            </f7-list>
          </f7-block>

          <f7-block style="margin:0 auto; width:80%">
            <f7-button large raised fill round popup-close @click="writeMode(n)">OK</f7-button>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

    <f7-popup id="set-schedule" class="schedule">
      <f7-view>
        <f7-page name="set-schedule">
          <f7-navbar>
            <f7-nav-title>{{ $t('message.schedule') }} {{ n+1 }}</f7-nav-title>
            <f7-nav-right>
              <f7-link popup-close><f7-icon material="clear"></f7-icon></f7-link>
            </f7-nav-right>
          </f7-navbar>
          
          <f7-block style="margin:20px auto; width:80%">

            <f7-row v-for="n in 6" :key="n" @click="openPopup(n)" style="margin-bottom:5px; height:32px">
              <f7-block-title style="margin:0 0 5px">{{ $t("message.dows["+n+"]") }}</f7-block-title>
              <f7-range class="sched1 color-blue" 
                :min="0" :max="24" :step="0.5" :dual="true" 
                :value="[ tsc[n][0]/100, tsc[n][1]/100 ]" :disabled="true">
              </f7-range>
              <f7-range class="sched2 color-blue" 
                :min="0" :max="24" :step="0.5" :dual="true" 
                :value="[ tsc[n][2]/100, tsc[n][3]/100 ]" :disabled="true">
              </f7-range>
              <f7-range class="sched3 color-blue" 
                :min="0" :max="24" :step="0.5" :dual="true"
                :value="[ tsc[n][4]/100, tsc[n][5]/100 ]" :disabled="true">
              </f7-range>
            </f7-row>

            <f7-row @click="openPopup(7)" style="height:32px">
              <f7-block-title style="margin:0 0 5px">{{ $t("message.dows[7]") }}</f7-block-title>
              <f7-range class="sched1 color-blue" 
                :min="0" :max="24" :step="0.5" :dual="true" :scale="true" :scale-steps="4" :scale-sub-steps="0" 
                :value="[ tsc[0][0]/100, tsc[0][1]/100 ]" :disabled="true">
              </f7-range>
              <f7-range class="sched2 color-blue" 
                :min="0" :max="24" :step="0.5" :dual="true" 
                :value="[ tsc[0][2]/100, tsc[0][3]/100 ]" :disabled="true">
              </f7-range>
              <f7-range class="sched3 color-blue" 
                :min="0" :max="24" :step="0.5" :dual="true"
                :value="[ tsc[0][4]/100, tsc[0][5]/100 ]" :disabled="true">
              </f7-range>
            </f7-row>

          </f7-block>  

          <f7-block style="margin:40px auto; width:80%">
            <f7-button large raised fill round popup-close @click="writeSchedule(n)">OK</f7-button>
          </f7-block>

        </f7-page>
      </f7-view>
    </f7-popup>

    <f7-popup id="set2-schedule" class="schedule">
      <f7-view>
        <f7-page name="set2-schedule">
          <f7-navbar>
            <f7-nav-title>{{ $t('message.schedule') }}</f7-nav-title>
            <f7-nav-right>
              <f7-link popup-close="#set2-schedule"><f7-icon material="clear"></f7-icon></f7-link>
            </f7-nav-right>
          </f7-navbar>
         
          <f7-block style="margin-top: 12px; padding: 5px 10%; background:white">

            <f7-row>
              <f7-col>
                <f7-list no-hairlines-md>
                  <f7-list-input type="text" outline floating-label label="on" placeholder="0:00"
                    :value="parseInt(on1/100)+(on1%100 ? ':30' : ':00')" @blur="on1 = ($event.target.value).replace(':','')" @focus="$event.target.select(),ts1=false; ts2=true; ts3=true">
                  </f7-list-input>
                </f7-list>
              </f7-col>
              <f7-col>
                <f7-list no-hairlines-md>
                  <f7-list-input type="text" outline floating-label label="off" placeholder="0:00" 
                    :value="parseInt(off1/100)+(off1%100 ? ':30' : ':00')" @blur="off1 = ($event.target.value).replace(':','')" @focus="$event.target.select(),ts1=false; ts2=true; ts3=true">
                  </f7-list-input>
                </f7-list>
              </f7-col>
            </f7-row>

            <f7-row>
              <f7-col>
                <f7-list no-hairlines-md>
                  <f7-list-input type="text" outline floating-label label="on" placeholder="0:00" 
                    :value="parseInt(on2/100)+(on2%100 ? ':30' : ':00')" @blur="on2 = ($event.target.value).replace(':','')" @focus="$event.target.select(),ts1=true; ts2=false; ts3=true">
                  </f7-list-input>
                </f7-list>
              </f7-col>
              <f7-col>
                <f7-list no-hairlines-md>
                  <f7-list-input type="text" outline floating-label label="off" placeholder="0:00" 
                    :value="parseInt(off2/100)+(off2%100 ? ':30' : ':00')" @blur="off2 = ($event.target.value).replace(':','')" @focus="$event.target.select(),ts1=true; ts2=false; ts3=true">
                  </f7-list-input>
                </f7-list>
              </f7-col>
            </f7-row>

            <f7-row>
              <f7-col>
                <f7-list no-hairlines-md>
                  <f7-list-input type="text" outline floating-label label="on" placeholder="0:00" 
                    :value="parseInt(on3/100)+(on3%100 ? ':30' : ':00')" @blur="on3 = ($event.target.value).replace(':','')" @focus="$event.target.select(),ts1=true; ts2=true; ts3=false">
                  </f7-list-input>
                </f7-list>
              </f7-col>
              <f7-col>
                <f7-list no-hairlines-md>
                  <f7-list-input type="text" outline floating-label label="off" placeholder="0:00" 
                    :value="parseInt(off3/100)+(off3%100 ? ':30' : ':00')" @blur="off3 = ($event.target.value).replace(':','')" @focus="$event.target.select(),ts1=true; ts2=true; ts3=false">
                  </f7-list-input>
                </f7-list>
              </f7-col>
            </f7-row>

          </f7-block>


          <f7-block style="margin:20px auto; width:80%">

            <f7-row>
              <f7-range class="sched1 color-blue" 
                :min="0" :max="24" :step="0.5" :dual="true" :scale="true" :scale-steps="4" :scale-sub-steps="0" 
                :value="[on1/100, off1/100]" @range:change="onRangeChange1" :disabled="ts1">
              </f7-range>
              <f7-range class="sched2 color-blue" 
                :min="0" :max="24" :step="0.5" :dual="true"
                :value="[on2/100, off2/100]" @range:change="onRangeChange2" :disabled="ts2">
              </f7-range>
              <f7-range class="sched3 color-blue" 
                :min="0" :max="24" :step="0.5" :dual="true"
                :value="[on3/100, off3/100]" @range:change="onRangeChange3" :disabled="ts3">
              </f7-range>
            </f7-row>

          </f7-block>

          <f7-block style="text-align:center; margin:30px auto">
            <span v-for="n in 7" :key="n" style="margin:9px">
              <f7-checkbox name="checkbox" :value="n" :checked="SelectDays[n]" @change="checkDay">{{ $t("message.dows["+n+"]") }}</f7-checkbox>
              <!-- <f7-radio name="radio" :value="n" :checked="SelectDays[n]" @change="checkDay">{{ $t("message.dows["+n+"]") }}</f7-radio> -->
            </span>
          </f7-block>

          <f7-block style="margin:20px auto; width:80%">
            <f7-button large raised fill round @click="setSchedule()">OK</f7-button>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

    <f7-popup id="set-circuito">
      <f7-view>
        <f7-page name="set-circuito">
          <f7-navbar>
            <f7-nav-title>{{ $t('message.set') }}</f7-nav-title>
            <f7-nav-right>
              <f7-link popup-close><f7-icon material="clear"></f7-icon></f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block style="margin-top:10px; margin-bottom:10px;">
            <canvas id="myChart" width="300" height="180"></canvas>
          </f7-block>

          <f7-block class="text-align-center" style="margin:15px;">
            <f7-row>
              <f7-col>
                <small>{{ $t('message.slope') }}</small><br>
                <f7-stepper small :disabled="!$f7.data.dev" :value="slope/10" :min="-10" :max="10" :step="1" @stepper:change="setSlope"></f7-stepper>
              </f7-col>
              <f7-col>
                <small>{{ $t('message.offset') }}</small><br>
                <f7-stepper small :disabled="!$f7.data.dev" :value="offset/10" :min="-100" :max="100" :step="10" @stepper:change="setOffset"></f7-stepper>
              </f7-col>
            </f7-row>
          </f7-block>

          <f7-block style="margin:0 auto; width:80%">
            <f7-button large raised fill round popup-close @click="writePar(n)">OK</f7-button>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

    <f7-popup id="set-value-dhw">
      <f7-view>
        <f7-page name="set-value-dhw">
          <f7-navbar>
            <f7-nav-title>{{ $t('message.set') }}</f7-nav-title>
            <f7-nav-right>
              <f7-link popup-close><f7-icon material="clear"></f7-icon></f7-link>
            </f7-nav-right>
          </f7-navbar>

          <f7-block-title large style="text-align:center">{{ $t('message.dhw') }}</f7-block-title>
          <f7-block style="text-align:center; font-size:5em;">
              <span class="temp">{{ (setdhw/10).toFixed(1) }}</span>
          </f7-block>

          <f7-block style="margin:10px auto 20px; width:90%">
            <f7-row tag="p">
              <f7-col tag="span">
                <f7-button large raised round @click="setDhw(-5)"><span class="icon-minus"></span></f7-button>
              </f7-col>
              <f7-col tag="span">
                <f7-button large raised round @click="setDhw(5)"><span class="icon-plus"></span></f7-button>
              </f7-col>
            </f7-row>
          </f7-block>

          <f7-block style="margin:0 auto; width:80%">
            <f7-button large raised fill round popup-close @click="writeDhw()">OK</f7-button>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

    <f7-popup id="set-schedule-nr">
      <f7-view>
        <f7-page name="set-schedule-nr">
          <f7-navbar>
            <f7-nav-title>{{ $t('message.schedule') }}</f7-nav-title>
            <f7-nav-right>
              <f7-link popup-close><f7-icon material="clear"></f7-icon></f7-link>
            </f7-nav-right>
          </f7-navbar>

          <f7-block-title large style="text-align:center">{{ $t('message.dhw') }}</f7-block-title>
          <f7-block>
            <f7-list>
              <f7-list-item color="blue" radio :title="$t('message.schedule')+ ' 1'" name="schednr" value="1" :checked="schedule === 1" @change="schedule = $event.target.value"></f7-list-item>
              <f7-list-item color="blue" radio :title="$t('message.schedule')+ ' 2'" name="schednr" value="2" :checked="schedule === 2" @change="schedule = $event.target.value"></f7-list-item>
              <f7-list-item color="blue" radio :title="$t('message.schedule')+ ' 3'" name="schednr" value="3" :checked="schedule === 3" @change="schedule = $event.target.value"></f7-list-item>
              <f7-list-item color="blue" radio :title="$t('message.schedule')+ ' 4'" name="schednr" value="4" :checked="schedule === 4" @change="schedule = $event.target.value"></f7-list-item>
            </f7-list>
          </f7-block>

          <f7-block style="margin:0 auto; width:80%">
            <f7-button large raised fill round popup-close @click="writeScheduleNr()">OK</f7-button>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

    <f7-popup id="set-mode-uvr">
      <f7-view>
        <f7-page name="set-mode-uvr">
          <f7-navbar>
            <f7-nav-title>{{ $t('message.mode') }}</f7-nav-title>
            <f7-nav-right>
              <f7-link popup-close><f7-icon material="clear"></f7-icon></f7-link>
            </f7-nav-right>
          </f7-navbar>

          <f7-block-title large style="text-align:center">{{ $t('message.uvr') }}</f7-block-title>
          <f7-block>
            <f7-list style="margin:20px auto">>
              <f7-list-item color="blue" radio title="III" name="mode1" value="4" :checked="modeuvr === 4" @change="modeuvr = $event.target.value"></f7-list-item>
              <f7-list-item color="blue" radio title="II" name="mode1" value="3" :checked="modeuvr === 3" @change="modeuvr = $event.target.value"></f7-list-item>
              <f7-list-item color="blue" radio title="I" name="mode1" value="2" :checked="modeuvr === 2" @change="modeuvr = $event.target.value"></f7-list-item>
              <f7-list-item color="blue" radio title="AUTO" name="mode1" value="1" :checked="modeuvr === 1" @change="modeuvr = $event.target.value"></f7-list-item>
              <f7-list-item color="blue" radio title="OFF" name="mode1" value="0" :checked="modeuvr === 0" @change="modeuvr = $event.target.value"></f7-list-item>
            </f7-list>
          </f7-block>

          <f7-block style="margin:0 auto; width:80%">
            <f7-button large raised fill round popup-close @click="writeModeUvr()">OK</f7-button>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

    <f7-popup id="set-name">
      <f7-view>
        <f7-page name="set-name">
          <f7-navbar>
            <f7-nav-title>{{ $t('message.description') }}</f7-nav-title>
            <f7-nav-right>
              <f7-link popup-close><f7-icon material="clear"></f7-icon></f7-link>
            </f7-nav-right>
          </f7-navbar>

          <f7-list inset>
            <f7-list-input
              type="text"
              :value="name"
              @input="name = $event.target.value"
              @focus="$event.target.select()"
              inputStyle="text-align:center; font-size:36px; height:44px; padding-bottom:6px"
              maxlength="16"
              size="80px"
            >
            </f7-list-input>
          </f7-list>

          <f7-block style="margin:60px auto; width:80%">
            <f7-button large raised fill round popup-close @click="writeName()">OK</f7-button>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

  </f7-page>
</template>

<script>
  export default {
    data: function () {
      return {
        n: 0, setv: 0, setc: 0, corr: 0, mode: 0, name: "", schedule: 0,
        off_on: ['off','on'],
        icon_mode: function(mode){
          let icon;
          switch (mode) {
            case 0: icon = "icon-off"; break;
            case 1: icon = "icon-sun"; break;
            case 2: icon = "icon-moon"; break;
            case 3: icon = "icon-clock"; break;
          }
          return icon
        },
        icon_status: function(){
          let icon;
          switch ($f7.data.input.t10103) {
            case 0: icon = "icon-off"; break;
            case 1: icon = "icon-sun"; break;
            case 2: icon = "icon-moon"; break;
          }
          if ($f7.data.input.t10105>2)
            icon += ' blink';          
          return icon
        },

        labels: [-20,-15,-10,-5,0,5,10,15,20],
        values1: [], values2: [],
        set1: 0, set2: 0,
        offset: 0, slope: 0,
        chart: null, 

        day: 1, SelectDays: [],
        tsc: { 
          "0": [0,0,0,0,0,0],
          "1": [0,0,0,0,0,0],
          "2": [0,0,0,0,0,0],
          "3": [0,0,0,0,0,0],
          "4": [0,0,0,0,0,0],
          "5": [0,0,0,0,0,0],
          "6": [0,0,0,0,0,0],
        },      
        on1: "", off1: "", on2: "", off2: "", on3: "", off3: "",
        ts1: true, ts2: true, ts3: true,

        setdhw: 0,

        modeuvr: 0, uvr: ['','A','I','II','III'],
        icon_uvr: function(mode){
          let icon;
          switch (mode) {
            case 0: icon = "icon-off"; break;
            default: icon = "icon-fan";  
          }
          return icon
        },
      };
    },

    methods: {
      setIndex(n){
        this.n = n;
        let cool = ($f7.data.input.t10042===1)*1;
        
        this.setv = $f7.data.input['t'+(18011+n+30*cool)];
        this.slope = $f7.data.input['t'+(18013+30*cool)];
        this.offset = $f7.data.input['t'+(18014+30*cool)];

        this.mode = $f7.data.input['t18001'];

        let j = 0;
        for (let i = 0; i <= 6; i++) {
          for (let k = 0; k < 6; k++) {  
            this.tsc[i][k] = $f7.data.input['t'+(19001+k+i*6+j)];
          }      
        }
      },
      setValue(corr){
        this.setv = this.setv+corr;
        this.corr = this.corr+corr; 
      },
      writeValue(n){
        let cool = ($f7.data.input.t10042===1)*1;
        $f7.methods.writeData('t'+(18011+this.n+30*cool)+'='+this.setv);          
      },
      writeMode(n){
        $f7.methods.writeData('t'+(18001)+'='+this.mode);
      },
      showState(){
        clearInterval($f7.data.polling);
        $f7.dialog.alert(this.$t('msg_state.'+$f7.data.input.t10105), '', function () {
          $f7.methods.pollData();
        });
      },

      setDhw(n){
        if (n === 0)
          this.setdhw = $f7.data.input['t17419'];
        else
          this.setdhw = this.setdhw+n;
          
        let j = ($f7.data.input.t17425-1)*42;
        for (let i = 0; i <= 6; i++) {
          for (let k = 0; k < 6; k++) {  
            this.tsc[i][k] = $f7.data.input['t'+(19001+k+i*6+j)];
          }      
        }
        this.n = $f7.data.input.t17425-1;
      },
      writeDhw(){
        $f7.methods.writeData('t17419='+this.setdhw);
      },
      
      setModeUvr(){
        this.modeuvr = $f7.data.input['t18091'];
      },
      writeModeUvr(){
        $f7.methods.writeData('t18091='+this.modeuvr);
      },

      setName(){
        this.name = $f7.data.input.t20001;
        $f7.popup.open("#set-name");
      },
      writeName(){
        this.name = (this.name+"                ").slice(0,15);
        $f7.methods.writeData('t20001='+this.name);
      },

      // Schedule      
      onRangeChange1(values) {
        this.on1 = values[0]*100;
        this.off1 = values[1]*100;
      },
      onRangeChange2(values) {
        this.on2 = values[0]*100;
        this.off2 = values[1]*100;
      },
      onRangeChange3(values) {
        this.on3 = values[0]*100;
        this.off3 = values[1]*100;
      },
      changeSchedule(n){
        this.schedule = n;
      },
      openPopup(n){
        for (let i = 1; i <= 7; i++) {
          if (i === n)
            this.SelectDays[i] = true;
          else
            this.SelectDays[i] = false;
        }
        this.day = n;
        
        if (n==7) n=0;
        this.on1 = this.tsc[n][0]; this.off1 = this.tsc[n][1];
        this.on2 = this.tsc[n][2]; this.off2 = this.tsc[n][3];
        this.on3 = this.tsc[n][4]; this.off3 = this.tsc[n][5];

        this.$forceUpdate();
        $f7.popup.open('#set2-schedule');
      },
      checkDay(){
        // console.log(event.target.value + ' = ' + event.target.checked);
        this.SelectDays[event.target.value] = event.target.checked;
        this.day = event.target.value;
      },
      setSchedule(){
        for (let i = 1; i <= 7; i++) {
          let n = i;
          if (this.SelectDays[i]) {            
            if (n==7) n=0;
            this.tsc[n][0] = parseInt(this.on1); this.tsc[n][1] = parseInt(this.off1);
            this.tsc[n][2] = parseInt(this.on2); this.tsc[n][3] = parseInt(this.off2);
            this.tsc[n][4] = parseInt(this.on3); this.tsc[n][5] = parseInt(this.off3);
          }
        }
        this.$forceUpdate();
        $f7.popup.close('#set2-schedule');
      },
      writeSchedule(n){
        let data = '';        
        let j = n*42;
        for (let i = 0; i <= 6; i++) {
          if (i<1) 
            data += 't';
          for (let k = 0; k < 6; k++) {
            data += (19001+k+i*6+j)+'='+this.tsc[i][k];
          if (i<6 || k<5) 
            data +='&';
          }      
        }
        $f7.methods.writeData(data);
      },
      setScheduleNr(){
        this.schedule = $f7.data.input['t17425'];
        $f7.popup.open("#set-schedule-nr");
      },
      writeScheduleNr(){
        $f7.methods.writeData('t17425='+this.schedule);
      },

      // curve     
      setSlope(value){
        this.slope = $f7.data.input['t18013']+value;
        this.updateChart();
      },
      setOffset(value){
        this.offset = $f7.data.input['t18014']+value;
        this.updateChart();
      },
      updateChart(){
        this.values1 = this.dataValues($f7.data.input['t18011']);
        this.chart.data.datasets["0"].label = $f7.data.input['t18011']/10 + '°C (Comfort)';
        this.chart.data.datasets["0"].data = this.values1;
        this.values2 = this.dataValues($f7.data.input['t18012']);
        this.chart.data.datasets["1"].label = $f7.data.input['t18012']/10 + '°C (Eco)';
        this.chart.data.datasets["1"].data = this.values2;
        this.chart.update();
      },
      dataValues(set){
        let values = [];
        for (let i = 0; i < this.labels.length; i++) { 
          values[i] = (Math.pow(((set+this.offset-this.labels[i]*10)/10)*(this.slope/10), 0.8)+set/10).toFixed(1);
        };
        return values;
      },
      createChart(){
        var ctx = document.getElementById('myChart');
        this.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.labels,
            datasets: [{ 
                data: [],
                label: "(Comfort)",
                borderColor: "#2196f3",
                fill: false,
                borderWidth: 2,
              },
              { 
                data: [],
                label: "(Eco)",
                borderColor: "#4d4d4d",
                fill: false,
                borderWidth: 2,
              }],
          },
          options: {
            legend: {
              display: true,
              labels: {
                boxWidth: 20,
              },
            },
            elements: {
              point: {
                radius: 0,
                hitRadius: 0,
              }
            },
            tooltips: {
              enabled: false, 
              mode: 'label',
              callbacks: {
                title: function(tooltipItems, data) { 
                  var tooltipItem = tooltipItems[0];
                  return 'esterna = ' + data.labels[tooltipItem.index] + '°C';
                },
                label: function(tooltipItem, data) {
                    var label = data.datasets[tooltipItem.datasetIndex].label || '';
                    if (label) { label += ': '};
                    label += tooltipItem.yLabel;
                    label += '°C';
                    return label;
                },
              }, 
            },
            scales: {
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'temp.esterna',

                },
                ticks: {
                  callback: function(dataLabel, index) {
                    return index % 2 === 0 ? dataLabel+'°' : '';
                  }
                }
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'setpoint',

                },
                ticks: {
                  max: 60,
                  min: 20,
                  stepSize: 5,
                  callback: function(dataLabel, index) {
                    return index % 2 === 0 ? dataLabel+'°' : '';
                  },
                }
              }]
            }
          },
        });
      },
      writePar(){
        $f7.methods.writeData('t18013='+this.slope+'&18014='+this.offset);
      },

    },
    mounted() {
      this.createChart();
    },
  }
</script>