import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type TFaqItem = {
  question: string;
  answer: string;
  value: string;
};

const faqsItem: TFaqItem[] = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept a variety of payment methods, including credit/debit cards, PayPal, Stripe, and local payment gateways. You can choose your preferred method during checkout.",
    value: "item-2",
  },
  {
    question: "Can I track my order after purchasing?",
    answer:
      "Yes, you can track your order through the 'Order Tracking' section in your account. You will also receive updates via email or SMS with tracking details.",
    value: "item-3",
  },
  {
    question: "How can I return or exchange a product?",
    answer:
      "To return or exchange a product, visit the 'Return/Exchange' section in your account, select the relevant order, and submit a request. Our support team will assist you further.",
    value: "item-4",
  },
  {
    question: "Do you offer discounts or coupons?",
    answer:
      "Yes, we offer discounts and coupons during seasonal sales and promotional events. Keep an eye on our website or subscribe to our newsletter to stay updated.",
    value: "item-5",
  },
  {
    question: "What is your policy for bulk orders?",
    answer:
      "We provide special discounts for bulk orders. Please contact our sales team at sales@tshirtstore.com for more details and pricing information.",
    value: "item-6",
  },
  {
    question: "How do I submit a product review?",
    answer:
      "Once you have purchased and received a product, you can submit a review by visiting the product page and clicking 'Write a Review.' Each purchase allows one review per product.",
    value: "item-7",
  },
  {
    question: "What happens if an item is out of stock?",
    answer:
      "If an item is out of stock, you can add it to your wishlist to be notified when it becomes available. Alternatively, you can contact our support team for further assistance.",
    value: "item-8",
  },
  {
    question: "How can I contact customer support?",
    answer:
      "You can contact our customer support via live chat on our website, email us at support@tshirtstore.com, or call us at (123) 456-7890. We're here to help!",
    value: "item-9",
  },
  {
    question: "Is there a warranty for your products?",
    answer:
      "Yes, we provide a one-year warranty on all products. If you encounter any issues, please contact our support team for assistance.",
    value: "item-10",
  },
];

const FAQsection = () => {
  return (
    <div className="FAQsectionContainer py-10 bg-gray-100 ">
      <div className="FAQsectionWrapper  w-[96%] sm:w-[92%] md:w-[90%] m-auto ">
        <h1 className=" mb-8 text-center font-semibold text-prime100 text-xl xsm:text-2xl sm:text-3xl md:text-3xl xl:text-4xl text-shadow-blue ">
          FAQ
        </h1>

        <Accordion
          type="single"
          collapsible
          className="  w-[96%] xsm:w-[90%] sm:w-[80%] md:w-[70%] xmd:w-[60%] lg:w-[50%] m-auto text-base sm:text-lg  "
        >
          {faqsItem &&
            faqsItem?.map((item: TFaqItem) => (
              <AccordionItem key={item?.value} value={item?.value}>
                <AccordionTrigger> {item?.question} </AccordionTrigger>
                <AccordionContent>{item?.answer}</AccordionContent>
              </AccordionItem>
            ))}
        </Accordion>

        {/*  */}
      </div>
    </div>
  );
};

export default FAQsection;
