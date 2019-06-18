import {END_SIG} from './constants'

export default class Zip32Header {

    getSignature = () => this._sig ? this._sig : END_SIG
    setSignature = (value) => this._sig = value

    getDiskNumber = () => this._disk
    setDiskNumber = (value) => this._disk = value

    getDiskNumberWhereCentralDirectoriesStart = () => this._cenDirDisk
    setDiskNumberWhereCentralDirectoriesStart = (value) => this._cenDirDisk = value

    getCentralDirectoriesNumberOnDisk = () => this._cenDirNumDisk
    setCentralDirectoriesNumberOnDisk = (value) => this._cenDirNumDisk = value

    getCentralDirectoriesNumber = () => this._cenDirs
    setCentralDirectoriesNumber = (value) => this._cenDirs = value

    getCentralDirectoriesSize = () => this._cenDirsSize
    setCentralDirectoriesSize = (value) => this._cenDirsSize = value

    getCentralDirectoriesOffsetWithStartingDisk = () => this._cenDirsOff
    setCentralDirectoriesOffsetWithStartingDisk = (value) => this._cenDirsOff = value

    getZipFileComment = () => this._comment ? this._comment : ''
    setZipFileComment = (value) => value !== '' ? this._comment = value : 0

    getHeaderLength = () => this._len
    setHeaderLength = (value) => this._len = value
}
