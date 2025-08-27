//#region AppSystem

/**
 * Path to home page in local dir.
 */
export const PATH_VIEW = "src/ui/view"
export const HOME = PATH_VIEW + "/html/home.html"

/**
 * Unix-like OS id
 */
export const UNIX_LIKE_OS = 'darwin'

//#endregion

//#region db
/**
 * id of null objects constant
 */
export const NULL_ID = -1
export const NULL_STRING = ""

/**
 * Path to database file.
 */
export const DB_PATH = "oculus.db"
export const DB_DRIVER = "better-sqlite3"

/**
 * Names of the database tables.
 */
export const PROJECT_TABLE = "projects"
export const CLASS_TABLE = "classes"
export const DATA_TABLE = "data"
export const ANNOTATION_TABLE = "annotation"
export const BOUNDING_BOX_TABLE = "BoundingBox"
export const MASK_TABLE = "Mask"

//#region db