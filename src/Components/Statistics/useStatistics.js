import dayjs from "dayjs";
import { useMemo, useRef, useState } from "react";
import { generateData } from "../../core/helpers/helpers";
import {
  ATTACHMENT_TYPES,
  COMPANIES,
  REQUEST_STATUS,
  SELECTABLE_RANGES,
} from "../../core/constants/constants";

export const useStatistics = ({
  mapLoading,
  selectedDate,
  dateMap,
  selectedRange,
}) => {
  const INITIAL_DELAY = 2.3;
  const [filters, setFilters] = useState({
    types: [],
    companies: [],
  });

  const statsRef = useRef(null);

  const calculateThisMonthCounterValue = useMemo(() => {
    //Edge Case here explain
    if (mapLoading) return;
    console.log("CounterDebug:Function enter", selectedDate);
    const startOfMonth = dayjs(selectedDate).startOf("month");
    const endOfMonth = dayjs(selectedDate).endOf("month");
    console.log(
      "CounterDebug:Function enter",
      selectedDate,
      startOfMonth,
      endOfMonth
    );

    let currentDate = startOfMonth.clone();
    let counterValue = 0;

    while (currentDate.isSame(endOfMonth) || currentDate.isBefore(endOfMonth)) {
      console.log("CounterDebug:In loop for date", currentDate);
      if (dateMap.get(currentDate?.format("YYYY-MM-DD"))) {
        counterValue += dateMap.get(currentDate?.format("YYYY-MM-DD"))?.data
          ?.length;
      } else {
        //Mock API hit
        const dataObject = {
          data: generateData(),
          date: currentDate,
        };
        counterValue += dataObject?.data?.length;
        dateMap.set(currentDate.format("YYYY-MM-DD"), dataObject);
      }

      currentDate = currentDate.add(1, "day");
    }
    return counterValue;
  }, [selectedDate.format("YYYY/MM/DD"), dateMap, mapLoading]);

  const calculateThisWeekCounterValue = useMemo(() => {
    //Edge Case here explain
    if (mapLoading) return;
    console.log("CounterDebug:Function enter", selectedDate);
    const startOfWeek = dayjs(selectedDate).startOf("week");
    const endOfWeek = dayjs(selectedDate).endOf("week");
    console.log(
      "CounterDebug:Function enter",
      selectedDate,
      startOfWeek,
      endOfWeek
    );

    let currentDate = startOfWeek.clone();
    let counterValue = 0;

    while (currentDate.isSame(endOfWeek) || currentDate.isBefore(endOfWeek)) {
      console.log("CounterDebug:In loop for date", currentDate);
      if (dateMap.get(currentDate?.format("YYYY-MM-DD"))) {
        counterValue += dateMap.get(currentDate?.format("YYYY-MM-DD"))?.data
          ?.length;
      } else {
        //Mock API hit
        const dataObject = {
          data: generateData(),
          date: currentDate,
        };
        counterValue += dataObject?.data?.length;
        dateMap.set(currentDate.format("YYYY-MM-DD"), dataObject);
      }

      currentDate = currentDate.add(1, "day");
    }
    return counterValue;
  }, [selectedDate.format("YYYY/MM/DD"), dateMap, mapLoading]);

  const calculateRequestsData = useMemo(() => {
    if (mapLoading) return;
    //Edge Case here explain
    const startOfWeek = dayjs(selectedDate).startOf(
      selectedRange === SELECTABLE_RANGES.TODAY
        ? "day"
        : selectedRange === SELECTABLE_RANGES.THIS_WEEK
        ? "week"
        : "month"
    );
    const endOfWeek = dayjs(selectedDate).endOf(
      selectedRange === SELECTABLE_RANGES.TODAY
        ? "day"
        : selectedRange === SELECTABLE_RANGES.THIS_WEEK
        ? "week"
        : "month"
    );
    console.log(
      "CounterDataDebug:Function enter",
      selectedDate,
      startOfWeek,
      endOfWeek
    );

    let currentDate = startOfWeek.clone();
    let counterValueDataArray = [];

    while (currentDate.isSame(endOfWeek) || currentDate.isBefore(endOfWeek)) {
      console.log("CounterDebug:In loop for date", currentDate);
      if (dateMap.get(currentDate?.format("YYYY-MM-DD"))) {
        counterValueDataArray.push(
          dateMap.get(currentDate?.format("YYYY-MM-DD"))?.data
        );
      } else {
        //Mock API hit
        const dataObject = {
          data: generateData(),
          date: currentDate,
        };
        counterValueDataArray.push(dataObject?.data);

        dateMap.set(currentDate.format("YYYY-MM-DD"), dataObject);
      }
      currentDate = currentDate.add(1, "day");
    }

    const filterCompanies =
      filters?.companies?.length > 0 ? filters?.companies : COMPANIES;
    const filterAttachments =
      filters?.types?.length > 0 ? filters.types : ATTACHMENT_TYPES;
    console.log("newDebug:", filterCompanies, filterAttachments);
    let counterValue = counterValueDataArray.reduce(
      (accumulator, current, index) => {
        console.log("newDebug:Reduce Ran", index);
        for (let i = 0; i < current.length; i++) {
          if (
            !(
              filterCompanies.includes(current[i]?.company) &&
              current[i]?.attachments.some((attachment) =>
                filterAttachments.includes(attachment?.type)
              )
            )
          ) {
            console.log("NewDebug:returning Condition not matched", {
              accumulator,
              counterValueDataArray,
              filterCompanies,
              filterAttachments,
              firstCondition: filterCompanies.includes(current[i]?.company),
              secondCondition: current[i]?.attachments.some((attachment) => {
                console.log(
                  "newDebug:in some debug",
                  filterAttachments,
                  attachment
                );
                return filterAttachments.includes(attachment?.type);
              }),
              current: current[i],
            });
            continue;
          }
          console.log("newDebug:conditionMatched", {
            counterValueDataArray,
            filterCompanies,
            filterAttachments,
            firstCondition: filterCompanies.includes(current[i]?.company),
            secondCondition: current[i]?.attachments.some((attachment) => {
              console.log(
                "newDebug:in some debug",
                filterAttachments,
                attachment
              );
              return filterAttachments.includes(attachment?.type);
            }),
            current: current[i],
          });
          if (current[i]?.status === REQUEST_STATUS.PROCESSED) {
            accumulator = {
              ...accumulator,
              numOfProcessedRequests: accumulator.numOfProcessedRequests + 1,
              processedData: [...accumulator.processedData, current[i]],
            };
          } else {
            accumulator = {
              ...accumulator,
              numOfPendingRequests: accumulator.numOfPendingRequests + 1,
              pendingData: [...accumulator.pendingData, current[i]],
            };
          }
        }
        return accumulator;
      },
      {
        // selectedDate: selectedDate.format("YYYY/MM/DD"),
        numOfPendingRequests: 0,
        numOfProcessedRequests: 0,
        pendingData: [],
        processedData: [],
      }
    );
    console.log("newDebug:Final", {
      counterValueDataArray,
      counterValue,
    });
    return counterValue;
  }, [
    selectedDate.format("YYYY/MM/DD"),
    dateMap,
    mapLoading,
    filters,
    selectedRange,
  ]);

  const calculateThisWeekLabel = useMemo(() => {
    //Edge Case here explain
    if (mapLoading) return;
    console.log("CounterDebug:Function enter", selectedDate);
    const startOfWeek = dayjs(selectedDate).startOf("week");
    const endOfWeek = dayjs(selectedDate).endOf("week");

    return `${startOfWeek.format("MM/DD")}-${endOfWeek.format("MM/DD")}`;
  }, [selectedDate.format("YYYY/MM/DD"), dateMap, mapLoading]);

  const calculateThisMonthLabel = useMemo(() => {
    //Edge Case here explain
    if (mapLoading) return;
    console.log("CounterDebug:Function enter", selectedDate);
    const startOfMonth = dayjs(selectedDate).startOf("month");
    const endOfMonth = dayjs(selectedDate).endOf("month");

    return `${startOfMonth.format("MM/DD")}-${endOfMonth.format("MM/DD")}`;
  }, [selectedDate.format("YYYY/MM/DD"), dateMap, mapLoading]);

  return {
    statsRef,
    filters,
    setFilters,
    INITIAL_DELAY,
    calculateRequestsData,
    calculateThisMonthCounterValue,
    calculateThisMonthLabel,
    calculateThisWeekCounterValue,
    calculateThisWeekLabel,
  };
};
