import { StringType, StringValues, NumberType } from "./config.validators";

export const CONFIG_SCHEMA = [
 /**
   * callsign = "" (none)
   * callsign = "2 3 4" (2 callsigns between 3-4 characters)
   * callsign = "3 1x3 2x2" (3 callsigns from 1x3 or 2x2 vocab)
   * callsign = "1 complex" (2 callsigns from complex vocab)
   */
  {
    label: 'Callsign',
    name: 'callsign',
    type: StringType(),
    value: '',
    error: '',
    isHidden: false
  },
  {
    label: 'Character Speed',
    name: 'cpm',
    type: NumberType(15, 100),
    value: 30,
    error: '',
    isHidden: false
  },
  {
    label: 'Effective Speed',
    name: 'eff',
    type: NumberType(4, 100),
    value: 30,
    error: '',
    isHidden: false
  },
  {
    label: 'Tone Frequency',
    name: 'freq',
    type: StringValues(400, 800),
    value: 600,
    error: '',
    isHidden: false
  },
  {
    label: 'Question Count',
    name: 'questions',
    type: NumberType(2, 20),
    value: 10,
    error: '',
    isHidden: false
  },
  {
    label: 'Answer Count',
    name: 'answers',
    type: NumberType(3, 10),
    value: 5,
    error: '',
    isHidden: false
  },
  {
    label: 'Word Count',
    name: 'words',
    type: NumberType(1, 5),
    value: 2,
    error: '',
    isHidden: false
  },
  {
    label: 'Min Word Size',
    name: 'minchars',
    type: NumberType(2, 5),
    value: 3,
    error: '',
    isHidden: false
  },
  {
    label: 'Max Word Size',
    name: 'maxchars',
    type: NumberType(2, 6),
    value: 3,
    error: '',
    isHidden: false
  },
  {
    label: 'Add Callsigns',
    name: 'callsigns',
    type: StringType(),
    value: '',
    error: '',
    isHidden: false
  },
  {
    label: 'Timeout Seconds',
    name: 'timeout',
    type: NumberType(1, 60),
    value: 30,
    error: '',
    isHidden: false
  },
  {
    label: 'Level',
    name: 'level',
    type: StringType(),
    value: '',
    error: '',
    isHidden: true
  },
  {
    label: 'Mode',
    name: 'mode',
    type: StringType(),
    value: '',
    error: '',
    isHidden: true
  },
  {
    label: 'Token',
    name: 'token',
    type: StringType(),
    value: '',
    error: '',
    isHidden: true
  },
  {
    label: 'Return URL',
    name: 'returnurl',
    type: StringType(),
    value: '',
    error: '',
    isHidden: true
  },
  {
    label: 'CWOps Info',
    name: 'infor',
    type: StringType(),
    value: '',
    error: '',
    isHidden: true
  },
  {
    label: 'Vocabulary',
    name: 'vocab',
    type: StringType(),
    value: 'threek', // default
    error: '',
    isHidden: true
  }
];

