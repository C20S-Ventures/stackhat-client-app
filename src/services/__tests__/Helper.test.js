import Helper from '../Helper'

describe('Helper', () => {
  describe('list utilities', () => {
    describe('inArray', () => {
      it('should return index if element exists', () => {
        const arr = [1, 2, 3]
        expect(Helper.list.inArray(2, arr)).toBe(1)
      })

      it('should return -1 if element does not exist', () => {
        const arr = [1, 2, 3]
        expect(Helper.list.inArray(4, arr)).toBe(-1)
      })
    })

    describe('exists', () => {
      it('should return true if element exists', () => {
        const arr = ['a', 'b', 'c']
        expect(Helper.list.exists('b', arr)).toBe(true)
      })

      it('should return false if element does not exist', () => {
        const arr = ['a', 'b', 'c']
        expect(Helper.list.exists('d', arr)).toBe(false)
      })
    })

    describe('getById', () => {
      it('should return item by id', () => {
        const list = [
          { id: 1, name: 'One' },
          { id: 2, name: 'Two' },
          { id: 3, name: 'Three' },
        ]
        const result = Helper.list.getById(list, 'id', 2)
        expect(result).toEqual({ id: 2, name: 'Two' })
      })

      it('should return undefined if not found', () => {
        const list = [{ id: 1, name: 'One' }]
        const result = Helper.list.getById(list, 'id', 999)
        expect(result).toBeUndefined()
      })

      it('should handle empty list', () => {
        const result = Helper.list.getById([], 'id', 1)
        expect(result).toBeUndefined()
      })
    })

    describe('getByIds', () => {
      it('should return items matching ids', () => {
        const list = [
          { id: 1, name: 'One' },
          { id: 2, name: 'Two' },
          { id: 3, name: 'Three' },
        ]
        const result = Helper.list.getByIds(list, 'id', [1, 3])
        expect(result).toHaveLength(2)
        expect(result[0].name).toBe('One')
        expect(result[1].name).toBe('Three')
      })
    })

    describe('getIds', () => {
      it('should return array of ids', () => {
        const list = [
          { id: 1, name: 'One' },
          { id: 2, name: 'Two' },
        ]
        const result = Helper.list.getIds(list, 'id')
        expect(result).toEqual([1, 2])
      })
    })

    describe('toggle', () => {
      it('should add element if not in array', () => {
        const arr = [1, 2]
        Helper.list.toggle(3, arr)
        expect(arr).toContain(3)
      })

      it('should remove element if in array', () => {
        const arr = [1, 2, 3]
        Helper.list.toggle(2, arr)
        expect(arr).not.toContain(2)
      })
    })

    describe('filter', () => {
      it('should filter by function', () => {
        const list = [1, 2, 3, 4, 5]
        const result = Helper.list.filter(list, (x) => x > 3)
        expect(result).toEqual([4, 5])
      })

      it('should filter by object expression', () => {
        const list = [
          { active: true, name: 'One' },
          { active: false, name: 'Two' },
          { active: true, name: 'Three' },
        ]
        const result = Helper.list.filter(list, { active: true })
        expect(result).toHaveLength(2)
      })

      it('should filter by string search', () => {
        const list = [
          { name: 'Apple' },
          { name: 'Banana' },
          { name: 'Apricot' },
        ]
        const result = Helper.list.filter(list, 'ap')
        expect(result).toHaveLength(2)
      })

      it('should return empty array for invalid input', () => {
        expect(Helper.list.filter(null, () => true)).toEqual([])
        expect(Helper.list.filter(undefined, () => true)).toEqual([])
      })
    })

    describe('orderObjectBy', () => {
      it('should sort by field ascending', () => {
        const list = [
          { name: 'Charlie' },
          { name: 'Alpha' },
          { name: 'Bravo' },
        ]
        const result = Helper.list.orderObjectBy(list, 'name')
        expect(result[0].name).toBe('Alpha')
        expect(result[1].name).toBe('Bravo')
        expect(result[2].name).toBe('Charlie')
      })

      it('should sort by field descending', () => {
        const list = [
          { value: 1 },
          { value: 3 },
          { value: 2 },
        ]
        const result = Helper.list.orderObjectBy(list, 'value', true)
        expect(result[0].value).toBe(3)
        expect(result[2].value).toBe(1)
      })

      it('should not modify original array', () => {
        const list = [{ value: 2 }, { value: 1 }]
        Helper.list.orderObjectBy(list, 'value')
        expect(list[0].value).toBe(2)
      })
    })
  })

  describe('string utilities', () => {
    describe('isNullOrEmpty', () => {
      it('should return true for null', () => {
        expect(Helper.string.isNullOrEmpty(null)).toBe(true)
      })

      it('should return true for undefined', () => {
        expect(Helper.string.isNullOrEmpty(undefined)).toBe(true)
      })

      it('should return true for empty string', () => {
        expect(Helper.string.isNullOrEmpty('')).toBe(true)
      })

      it('should return false for non-empty string', () => {
        expect(Helper.string.isNullOrEmpty('hello')).toBe(false)
      })

      it('should return false for whitespace', () => {
        expect(Helper.string.isNullOrEmpty('  ')).toBe(false)
      })
    })

    describe('isNullOrWhitespace', () => {
      it('should return true for null', () => {
        expect(Helper.string.isNullOrWhitespace(null)).toBe(true)
      })

      it('should return true for whitespace only', () => {
        expect(Helper.string.isNullOrWhitespace('   ')).toBe(true)
      })

      it('should return false for string with content', () => {
        expect(Helper.string.isNullOrWhitespace('  hello  ')).toBe(false)
      })
    })

    describe('isNumber', () => {
      it('should return true for numeric string', () => {
        expect(Helper.string.isNumber('123')).toBe(true)
      })

      it('should return false for non-numeric string', () => {
        expect(Helper.string.isNumber('abc')).toBe(false)
      })

      it('should return false for mixed string', () => {
        expect(Helper.string.isNumber('12a')).toBe(false)
      })
    })
  })

  describe('obj utilities', () => {
    describe('getProperty', () => {
      it('should get nested property', () => {
        const obj = { a: { b: { c: 'value' } } }
        expect(Helper.obj.getProperty(['a', 'b', 'c'], obj)).toBe('value')
      })

      it('should return null for missing property', () => {
        const obj = { a: { b: 1 } }
        expect(Helper.obj.getProperty(['a', 'c'], obj)).toBeNull()
      })

      it('should return null for null object', () => {
        expect(Helper.obj.getProperty(['a'], null)).toBeNull()
      })

      it('should return null for invalid path', () => {
        expect(Helper.obj.getProperty(null, { a: 1 })).toBeNull()
      })
    })
  })

  describe('files utilities', () => {
    describe('getFilename', () => {
      it('should sanitize filename', () => {
        const result = Helper.files.getFilename('Hello World!', 'pdf')
        expect(result).toBe('hello_world_.pdf')
      })

      it('should truncate long filenames', () => {
        const longTitle = 'A'.repeat(100)
        const result = Helper.files.getFilename(longTitle, 'txt')
        expect(result.length).toBeLessThanOrEqual(54) // 50 + .txt
      })
    })
  })

  describe('data utilities', () => {
    describe('toBlob', () => {
      it('should create blob from string', () => {
        const result = Helper.data.toBlob('test data', false)
        expect(result).toBeInstanceOf(Blob)
      })

      it('should create blob from base64', () => {
        const base64 = btoa('test data')
        const result = Helper.data.toBlob(base64, true)
        expect(result).toBeInstanceOf(Blob)
      })
    })
  })
})
