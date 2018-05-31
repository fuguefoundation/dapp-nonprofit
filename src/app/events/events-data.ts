import { Event } from './event';

export const EVENTSDATA: Event[] = [
  {
	name: "Voting Rules Changed",
	fromBlock: 2357577,
	address: "0xa28547a46e30d4d1e7acc312197ced6a5cd049a8",
	topic: "0xa439d3fa452be5e0e1e24a8145e715f4fd8b9c08c96a42fd82a855a85e5d57de",
	contract: "Board"
  },
  {
	name: "Beneficiary Added",
	fromBlock: 2357458,
	address: "0x8ef2a62553ce3b4f3cb55ca66a4568fef156ad6d",
	topic: "0xbd793e14f2ef74a7a875db560b865f09db4c686288570de877a4c9c33e6dae47",
	contract: "FF"
  },
  {
	name: "Donor Added",
	fromBlock: 2362715,
	address: "0x8ef2a62553ce3b4f3cb55ca66a4568fef156ad6d",
	topic: "0x38f82d361f29ccce5adbe27ec477933b6e50c3349b159a68a38ca474a3b9a349",
	contract: "FF"
  },
  {
	name: "Donation Added",
	fromBlock: 2362715,
	address: "0x8ef2a62553ce3b4f3cb55ca66a4568fef156ad6d",
	topic: "0xab507d6e61d12001c90dcdcad4e570ea84434575d005477573be052ecc4cf2ba",
	contract: "FF"
  }
];