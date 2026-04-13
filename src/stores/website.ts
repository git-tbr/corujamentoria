import { defineStore } from 'pinia'

const sessionData = JSON.parse(localStorage.getItem('userData') ?? '{}')
