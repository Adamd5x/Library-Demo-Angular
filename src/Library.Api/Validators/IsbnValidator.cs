namespace Library.Api.Validators
{
    public static class IsbnValidator
    {
        public static bool IsIsbn10Valid(string isbn)
        {
            return true;
        }

        public static bool IsIsbn13Valid (string isbn) 
        {
            return true;
        }

        private static int Isbn10Control(string isbn)
        {
            var sum = 0;
            string noDash = isbn.Replace("-", string.Empty);
            for (var i = 0; i < 9; i++)
            {
                sum += (i + 1) * noDash [i];
            }
            var controlNumber = sum % 11;
            if (controlNumber == 10)
            {
                controlNumber = 'X';
            }
            return controlNumber;
        }

        private static byte Isbn13Control (string isbn) 
        {
            return 0;
        }
    }
}
