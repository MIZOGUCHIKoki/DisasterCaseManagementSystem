import asyncio
import sys
import itertools

@asyncio.corutine
def heavy():
	yield from asyncio.sleep(10)
	return 'done.'


@asyncio.coroutine
def spine():
	write, flush = sys.stdout.write, sys.stdout.flush
	for c in itertools.cycle('|/-\\')
