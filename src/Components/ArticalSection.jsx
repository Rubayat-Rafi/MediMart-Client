const ArticalSection = () => {
  return (
    <section className="bg-base-200 py-12">
      <div className="container mx-auto px-6">
      <h2 className="text-xl font-bold text-gray-800 text-center mb-10">
      Read Articles
          </h2>
        {/* Medicine Articles Section */}
        <div className="mb-12">
          <h2 className="text-base font-bold text-gray-800 mb-4">
             About Medicine
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Breakthrough in Diabetes Treatment
              </h3>
              <p className="text-gray-600">
                Explore how new medications are transforming the lives of
                diabetic patients by controlling blood sugar levels more
                effectively.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                All About Antibiotics
              </h3>
              <p className="text-gray-600">
                Understand how antibiotics work and the risks of overuse or
                misuse.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Herbal vs. Prescription Medicine
              </h3>
              <p className="text-gray-600">
                A comparison of natural remedies versus conventional
                medicines—when and how they work best.
              </p>
            </div>
          </div>
        </div>

        {/* Illness Articles Section */}
        <div>
          <h2 className="text-base font-bold text-gray-800 mb-4">
             About Illnesses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Flu or Cold? Here&apos;s How to Tell the Difference
              </h3>
              <p className="text-gray-600">
                An in-depth guide to understanding symptoms, treatments, and
                prevention.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Mental Health Awareness
              </h3>
              <p className="text-gray-600">
                Highlighting the importance of mental well-being and the signs
                of common disorders like anxiety and depression.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Chronic Illness Management Tips
              </h3>
              <p className="text-gray-600">
                Practical advice for living with conditions like asthma,
                arthritis, or hypertension.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArticalSection;
