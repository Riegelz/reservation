// eslint-disable-next-line import/no-extraneous-dependencies
const nid = require('nid');

let tableInfo = {
  table_no: 0,
  table_status: 'Available',
  table_booking_id: null,
  table_seater: 0,
};

let tableMap = [];
const increase = [];

/**
 * Init Table for reservation
 * @param {number} initTable
 * @param {boolean} reInit
 * @returns {[]Array} tableMap
 */
const initTableReservations = async (initTable, reInit = false) => {
  try {
    if (reInit && tableMap.length !== 0) {
      throw new Error('Can not re-call initialize table');
    }
    if (reInit) {
      for (let index = 0; index < initTable; index += 1) {
        tableInfo = {
          ...tableInfo,
          table_no: index + 1,
        };
        tableMap.push(tableInfo);
      }
    }
    if (!reInit) {
      if (initTable > tableMap.length) {
        const dif = parseInt(initTable - tableMap.length, 10);
        for (let index = 0; index < dif; index += 1) {
          tableInfo = {
            ...tableInfo,
            table_no: tableMap.length + index + 1,
          };
          increase.push(tableInfo);
        }
        return tableMap.concat(increase);
      }
      if (initTable < tableMap.length) {
        const filterAvailableTable = tableMap.filter((val) => val.table_status !== 'Available');
        if (filterAvailableTable.length < initTable) {
          throw new Error('Can not initialize table.');
        } else {
          filterAvailableTable.forEach((index) => {
            delete tableMap[tableMap.indexOf(index)];
            tableMap = tableMap.filter((element) => {
              return element !== null;
            });
          });
        }
      }
    }
    return tableMap;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * get reservation information
 * @returns {[]Array} tableMap
 */
const getReservationInfo = async () => {
  try {
    return tableMap;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * split number of customer for each table limit
 * @param {number} num
 * @returns {[]Array} result
 */
const splitNumber = async (num) => {
  const result = [];
  let group = num;
  while (group > 0) {
    const subarraySize = Math.min(group, process.env.SEAT_PER_TABLE);
    result.push(subarraySize);
    group -= subarraySize;
  }
  return result;
};

/**
 * check remain table
 * @returns {number}
 */
const checkRemainTable = async () => {
  try {
    const isAvailable = tableMap.filter((val) => val.table_status === 'Available');
    return isAvailable.length;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * Check available table and reserved if condition is correct
 * @param {number} numberCustomer
 * @returns {[]Array}
 */
const checkAvailableAndReserved = async (numberCustomer) => {
  try {
    const splitTable = Math.ceil(numberCustomer / process.env.SEAT_PER_TABLE);
    const splitCustomerTable = await splitNumber(numberCustomer);
    const isAvailable = tableMap.filter((val) => val.table_status === 'Available');
    const reservationInfo = [];
    if (isAvailable.length >= splitTable) {
      const bookingID = nid(10);
      for (let index = 0; index < splitTable; index += 1) {
        const getAvailable = tableMap.find((u) => u.table_status === 'Available');
        const updatedTable = {
          ...tableMap[tableMap.indexOf(getAvailable)],
          table_booking_id: bookingID,
          table_status: 'Unavailable',
          table_seater: splitCustomerTable[index],
        };
        tableMap[tableMap.indexOf(getAvailable)] = updatedTable;
        reservationInfo.push(updatedTable);
      }
    } else {
      throw new Error('Available not enough for reservation.');
    }
    return reservationInfo;
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * reserved table main function
 * @param {number} numberCustomer
 * @returns {Object}
 */
const reservationTable = async (numberCustomer) => {
  try {
    const isAvailable = await checkAvailableAndReserved(numberCustomer);
    const remainTable = await checkRemainTable();
    return { reservation_info: isAvailable, remain: remainTable };
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * cancel reserved table
 * @param {string} bookingID
 * @returns {Object}
 */
const cancelReservationTable = async (bookingID) => {
  try {
    const reservationInfo = [];
    const checkBoolingID = tableMap.filter((val) => val.table_booking_id === bookingID);
    if (checkBoolingID.length !== 0) {
      checkBoolingID.forEach((val) => {
        const updatedTable = {
          ...tableMap[tableMap.indexOf(val)],
          table_booking_id: null,
          table_status: 'Available',
          table_seater: 0,
        };
        reservationInfo.push(updatedTable);
        tableMap[tableMap.indexOf(val)] = updatedTable;
      });
      const remainTable = await checkRemainTable();
      return { reservation_info: reservationInfo, remain: remainTable };
    }
    throw new Error('Booking ID not found.');
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  initTableReservations,
  getReservationInfo,
  reservationTable,
  checkAvailableAndReserved,
  cancelReservationTable,
  splitNumber,
};
