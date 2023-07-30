import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
const getFileNameWithDate = (fileName: string): string => {
  if (fileName.includes('$')) {
    const splitFileName = fileName.split('$')

    return splitFileName[0] + dayjs.utc(new Date()).format(splitFileName[1]) + splitFileName[2]
  }

  return fileName
}

export default getFileNameWithDate
