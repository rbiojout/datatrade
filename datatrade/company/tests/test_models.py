from django.test import TestCase
from datatrade.company.models import Company

# Create your tests here.
class CompanyTestCase(TestCase):
    def setUp(self):
      Company.objects.create(name="Company1", symbol="COMP1")
      Company.objects.create(name="Company2", symbol="COMP2")

    def test_companies_have_symbols(self):
        """Companies are correctly identified"""
        comp1 = Company.objects.get(name="Company1")
        comp2 = Company.objects.get(name="Company2")
        self.assertEqual(comp1.symbol, 'COMP1')
        self.assertEqual(comp2.symbol, 'COMP2')

