'use strict'

const currentTimeDisplay = document.getElementById('current-time-display')
const alarmTimeDisplay = document.getElementById('alarm-time-display')
const alarmMessageDisplay = document.getElementById('alarm-message-display')
const alarmBtn = document.getElementById('set-alarm-button')
const stopBtn = document.getElementById('stop-alarm-button')
const amPmSelector = document.getElementById('am-pm')

let currentTime = null
let alarmTime = null
const audio = new Audio('./alarm.wav')

function renderCurrentTime() {
    setInterval(() => {
        const current = new Date()
        currentTime = current.toLocaleTimeString()
        currentTimeDisplay.textContent = currentTime
        alarmChecker()
    }, 1000)
}

function setAlarm() {
    event.preventDefault()
    let wakeyHours = document.getElementById('hours-input')
    let wakeyMins = document.getElementById('minutes-input')

    if (wakeyHours.value > 12) {
        wakeyHours.value = 12
    } 
    if (wakeyHours.value < 1) {
        wakeyHours.value = 1
    }
    if (wakeyMins.value > 59) {
        wakeyMins.value = 59
    }
    if (wakeyMins.value < 0) {
        wakeyMins.value = "00"
    }

    wakeyMins.toString(wakeyMins.value)

    // if you have a single minutes digit add a 0 in front so it 01
    if (wakeyMins.value[0] !== '0' && wakeyMins.value / 10 < 1) {
        wakeyMins.value = "0" + wakeyMins.value
    } 
    else if (wakeyMins.value === '0') {
        wakeyMins.value = '00'
    }

    if (wakeyHours.value / 10 < 1) {
        wakeyHours.value = wakeyHours.value
    }

    alarmTime = `${wakeyHours.value}:${wakeyMins.value}:00 ${amPmSelector.value}`
    alarmTimeDisplay.textContent = alarmTime
}

function alarmChecker() {
    if (alarmTime === currentTime) {
        ringTheAlarm()
    }
}

function ringTheAlarm() {
    audio.play()
    alarmMessageDisplay.textContent = '🔔 WAKE UP, SUCKA! 🔔'
}

function stopAlarm() {
    audio.pause()
    alarmMessageDisplay.textContent = ""
}

renderCurrentTime()

alarmBtn.addEventListener('click', setAlarm)
stopBtn.addEventListener('click', stopAlarm)