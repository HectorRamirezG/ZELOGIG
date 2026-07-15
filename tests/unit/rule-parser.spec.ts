import { describe, expect, it } from "vitest";
import { parseRules } from "../../src/features/game/domain/rule-parser";

it("detects a horizontal noun IS property rule", () => {
  const rules = parseRules([
    { id:"a", kind:"word", wordKind:"noun", value:"DOOR", position:{row:0,column:0} },
    { id:"b", kind:"word", wordKind:"operator", value:"IS", position:{row:0,column:1} },
    { id:"c", kind:"word", wordKind:"property", value:"OPEN", position:{row:0,column:2} }
  ]);
  expect(rules).toHaveLength(1);
  expect(rules[0]).toMatchObject({ subject:"DOOR", predicate:"OPEN" });
});
