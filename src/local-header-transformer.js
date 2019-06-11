import {Transform} from 'stream'
import LocalHeaderSerializer from './local-header-serializer'

export default class LocalHeaderWriteable extends Transform {

    constructor() {

        super({objectMode: true})
        this.deserializer = new LocalHeaderSerializer()
    }

    _write = (chunk, encoding, callback) => {

        let bytesRead = 0

        while (bytesRead < chunk.length) {

            const fixRead = this.deserializer.updateFixed(chunk.slice(bytesRead))
            bytesRead += fixRead.bytes

            if (!fixRead.done)
                continue

            const varRead = this.deserializer.updateVar(chunk.slice(bytesRead))
            bytesRead += varRead.bytes

            if (varRead.done) {

                debugger
                this.push(this.deserializer.deserealize())
                // this.end()
                // this.unshift(chunk.slice(bytesRead))
                break
            }
        }

        debugger
        callback()
    }

    _read (size) {



        debugger
    }
}
