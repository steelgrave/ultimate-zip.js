import * as entrySync from 'lib/zip-entry-sync'
import {readLocHeader} from 'utils'
import {inflaterSync} from 'inflater'

jest.mock('inflater')
jest.mock('utils')

afterEach(() => {
    inflaterSync.mockClear()
})

describe('Unit testing zip-entry-sync.js', () => {

    const file = {
        readSync: () => undefined,
        writeFileSync: () => undefined,
        makeDirSync: () => 'making directories'
    }

    readLocHeader.mockImplementation(() => ({length: 0}))

    it('should assert getAsBufferSync method does throw on directory', () => {

        const header = {
            isDirectory: () => true
        }

        expect(() => entrySync.getAsBufferSync(header, file)).toThrow()
    })

    it('should assert getAsBufferSync method does return from inflatedSync', () => {

        const header = {
            isDirectory: () => false
        }

        inflaterSync.mockImplementation(() => true)
        expect(entrySync.getAsBufferSync(header, file)).toBe(true)
    })

   it('should assert testSync method does not call inflateSync on directory', () => {

        const header = {
            isDirectory: () => true,
            isEmpty: () => false
        }

        entrySync.testSync(header, file)
        expect(inflaterSync).toHaveBeenCalledTimes(0)
    })

    it('should assert testSync method does not call inflateSync on empty file', () => {

        const header = {
            isDirectory: () => false,
            isEmpty: () => true
        }

        entrySync.testSync(header, file)
        expect(inflaterSync).toHaveBeenCalledTimes(0)
    })

    it('should assert testSync method does call to inflateSync on ordinary file', () => {

        const header = {
            isDirectory: () => false,
            isEmpty: () => false
        }

        entrySync.testSync(header, file)
        expect(inflaterSync).toHaveBeenCalledTimes(1)
    })

    it('should assert extractSync method does make directories', () => {

        const header = {
            isDirectory: () => true
        }

        expect(entrySync.extractSync('some path', header, file)).toBe('making directories')
    })

    /*
    it('should assert extractSync method does call to writeFileSync on empty file', () => {

        const header = {
            isDirectory: () => false,
            isEmpty: () => true
        }

        expect(entrySync.extractSync('some path', header, file)).toBe('writing a file')
    })
    */
})