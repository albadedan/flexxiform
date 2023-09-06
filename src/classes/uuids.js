import {v4 as uuid} from 'uuid'
import shortuuid from 'short-uuid'
import { hri as humanuuid } from 'human-readable-ids'

const translator = shortuuid()

/**
 * Generates and returns a new v4 UUID using uuid package
 * 
 * @function generateStandard
 *
 * ### RETURNS
 * @returns {String}
 *
 * @author Dan Barker <dan@dan-barker.co.uk>
 */
export function generateStandard() {
    return uuid()
}

/**
 * Generates and returns a new destructurable pair of short and long v4 UUIDs using the short-uuid package
 * 
 * @function generateShortPair
 *
 * ### RETURNS
 * @returns {Object} { short, long }
 *
 * @author Dan Barker <dan@dan-barker.co.uk>
 */
export function generateShortPair() {
    const _short = shortuuid.generate()
    const _long = translator.toUUID(_short)
    return { short: _short, long: _long }
}

/**
 * Generates and returns a new short vd UUID using the short-uuid package
 * 
 * @function generateShort
 *
 * ### RETURNS
 * @returns {String}
 *
 * @author Dan Barker <dan@dan-barker.co.uk>
 */
export function generateShort() {
    return shortuuid.generate()
}

/**
 * Generates and returns a semi-human readable id by concatenating a human readable id and a shortuuid
 * 
 * @function generateNamedShort
 *
 * ### RETURNS
 * @returns {String} e.g: "human-readable-12-dadsda5423rfacsa"
 *
 * @author Dan Barker <dan@dan-barker.co.uk>
 */
export function generateNamedShort() {
    return `${generateHumanReadable}-${generateShort()}`
}

/**
 * Generates and returns a new human readable UUID using the human-readable-ids package
 * 
 * @function generateHumanReadable
 *
 * ### RETURNS
 * @returns {String} e.g., 'swift-dragon-35'
 *
 * @author Dan Barker <dan@dan-barker.co.uk>
 */
export function generateHumanReadable() {
    return humanuuid.random()
}