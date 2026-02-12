class Solution:
    def solution1(self, num: int) -> str:
        """
            NOTE: There was a conscious decision here to not include the repeating variants of
                  the base-10 numerals. While they remove the need to iterate on the same index
                  (which means that you can safely increase the pointer every time), the actual
                  number of loops is, on average, higher because you'll always need to check each
                  of those indices once. This saves storage space for the extra elements and
                  reduces the number of times the loop needs to run in the average case with a
                  tradeoff of having an extra condition to check on every iteration.
        """
        romanMap = [
            ["M", 1000],
            ["CM", 900],
            ["D", 500],
            ["CD", 400],
            ["C", 100],
            ["XC", 90],
            ["L", 50],
            ["XL", 40],
            ["X", 10],
            ["IX", 9],
            ["V", 5],
            ["IV", 4],
            ["I", 1],
        ]

        pointer = 0
        output = ""

        while (num > 0):
            if num >= romanMap[pointer][1]:
                output += romanMap[pointer][0]
                num -= romanMap[pointer][1]
            
            if num < romanMap[pointer][1]:
                pointer += 1
        
        return output

    """
      This is dumb but it's so fast
    """
    def solution2(self, num) -> str:
        output = ""

        if (num >= 3000):
            output += "MMM"
            num -= 3000

        if (num >= 2000):
            output += "MM"
            num -= 2000

        if (num >= 1000):
            output += "M"
            num -= 1000

        if (num >= 900):
            output += "CM"
            num -= 900
        
        if (num >= 800):
            output += "DCCC"
            num -= 800
        
        if (num >= 700):
            output += "DCC"
            num -= 700
        
        if (num >= 600):
            output += "DC"
            num -= 600
        
        if (num >= 500):
            output += "D"
            num -= 500
        
        if (num >= 400):
            output += "CD"
            num -= 400
        
        if (num >= 300):
            output += "CCC"
            num -= 300
        
        if (num >= 200):
            output += "CC"
            num -= 200
        
        if (num >= 100):
            output += "C"
            num -= 100
        
        if (num >= 90):
            output += "XC"
            num -= 90
        
        if (num >= 80):
            output += "LXXX"
            num -= 80
        
        if (num >= 70):
            output += "LXX"
            num -= 70
        
        if (num >= 60):
            output += "LX"
            num -= 60
        
        if (num >= 50):
            output += "L"
            num -= 50
        
        if (num >= 40):
            output += "XL"
            num -= 40
        
        if (num >= 30):
            output += "XXX"
            num -= 30
        
        if (num >= 20):
            output += "XX"
            num -= 20
        
        if (num >= 10):
            output += "X"
            num -= 10
        
        if (num >= 9):
            output += "IX"
            num -= 9
        
        if (num >= 8):
            output += "VIII"
            num -= 8
        
        if (num >= 7):
            output += "VII"
            num -= 7
        
        if (num >= 6):
            output += "VI"
            num -= 6
        
        if (num >= 5):
            output += "V"
            num -= 5
        
        if (num >= 4):
            output += "IV"
            num -= 4
        
        if (num >= 3):
            output += "III"
            num -= 3
        
        if (num >= 2):
            output += "II"
            num -= 2
        
        if (num >= 1):
            output += "I"
            num -= 1

        return output

    def intToRoman(self, num: int) -> str:
        # return self.solution1(num)
        return self.solution2(num)
