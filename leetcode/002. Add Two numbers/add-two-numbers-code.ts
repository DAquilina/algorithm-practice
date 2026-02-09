/**
 * Definition for singly-linked list.
 **/
class ListNode {
  val: number
  next: ListNode | null
  constructor(val?: number, next?: ListNode | null) {
    this.val = (val ?? 0)
    this.next = (next ?? null)
  }
}

function reduce(
    l1: ListNode | null | undefined,
    l2: ListNode | null | undefined,
    accumulator: ListNode,
    carryOver: number = 0
): void {
  accumulator.val = (l1?.val ?? 0) + (l2?.val ?? 0) + carryOver;

  let newCarryOver: number = 0;

  if (accumulator.val > 9) {
    newCarryOver = 1;
    accumulator.val -= 10;
  }

  let next = new ListNode();

  if (l1?.next || l2?.next) {
    accumulator.next = next;

    reduce(l1?.next, l2?.next, next, newCarryOver);
  }
  else if (newCarryOver > 0) {
    accumulator.next = new ListNode(newCarryOver);
  }
}

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  if (!l1) {
    return l2 ?? null;
  }

  if (!l2) {
    return l1;
  }

  const initial = new ListNode();

  reduce(l1, l2, initial);

  return initial;
};
