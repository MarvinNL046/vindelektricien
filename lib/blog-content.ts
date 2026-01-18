import { getStateLink, getTreatmentTypeLink } from './blog-data';

interface BlogContent {
  [key: string]: string;
}

export const blogContent: BlogContent = {
  'signs-of-addiction-when-to-seek-help': `
    <div class="blog-content space-y-6">
      <p class="text-lg leading-relaxed text-gray-700">
        Recognizing the signs of addiction in yourself or a loved one is the crucial first step toward recovery. Substance use disorders affect millions of Americans, and early intervention significantly improves treatment outcomes. This guide will help you identify the warning signs and understand when it's time to seek professional help.
      </p>

      <section class="mt-8 space-y-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Physical Warning Signs</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            Addiction often manifests through physical changes that become more noticeable over time:
          </p>
          <ul class="space-y-2 text-gray-700">
            <li class="flex items-start">
              <span class="text-blue-600 mr-2">•</span>
              <span>Changes in appetite or sleep patterns</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 mr-2">•</span>
              <span>Unexplained weight loss or gain</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 mr-2">•</span>
              <span>Bloodshot eyes or dilated pupils</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 mr-2">•</span>
              <span>Deterioration in physical appearance and hygiene</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 mr-2">•</span>
              <span>Tremors, slurred speech, or impaired coordination</span>
            </li>
          </ul>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Behavioral Warning Signs</h2>
          <p class="text-gray-700 leading-relaxed mb-4">
            Changes in behavior can be strong indicators of substance abuse:
          </p>
          <ul class="space-y-2 text-gray-700">
            <li class="flex items-start">
              <span class="text-blue-600 mr-2">•</span>
              <span>Secretive behavior or lying about activities</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 mr-2">•</span>
              <span>Withdrawal from family and friends</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 mr-2">•</span>
              <span>Neglecting responsibilities at work, school, or home</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 mr-2">•</span>
              <span>Financial problems or unexplained need for money</span>
            </li>
            <li class="flex items-start">
              <span class="text-blue-600 mr-2">•</span>
              <span>Engaging in risky behaviors</span>
            </li>
          </ul>
        </div>

        <div class="bg-blue-50 rounded-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-3">When to Seek Help</h2>
          <p class="text-gray-700 mb-4">
            If you recognize these signs in yourself or a loved one, it may be time to consider professional treatment. <a href="${getTreatmentTypeLink('inpatient-rehab')}" class="text-blue-600 hover:text-blue-800 underline">Inpatient rehabilitation</a> or <a href="${getTreatmentTypeLink('outpatient-programs')}" class="text-blue-600 hover:text-blue-800 underline">outpatient programs</a> can provide the support needed for recovery.
          </p>
          <p class="text-gray-700">
            Find <a href="/" class="text-blue-600 hover:text-blue-800 underline">treatment facilities near you</a> to take the first step toward recovery.
          </p>
        </div>
      </section>
    </div>
  `,

  'how-to-choose-the-right-rehab-center': `
    <div class="blog-content space-y-6">
      <p class="text-lg leading-relaxed text-gray-700">
        Choosing the right rehabilitation center is one of the most important decisions you'll make on your recovery journey. With thousands of treatment facilities across the United States, understanding what to look for can help you find the program that best fits your needs.
      </p>

      <section class="mt-8 space-y-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Key Factors to Consider</h2>

          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">1. Treatment Approach</h3>
              <p class="text-gray-700">
                Different facilities use different approaches. Some focus on 12-step programs, while others offer holistic treatment, cognitive behavioral therapy, or medication-assisted treatment. Consider which approach aligns with your values and needs.
              </p>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">2. Level of Care</h3>
              <p class="text-gray-700">
                Treatment options range from <a href="${getTreatmentTypeLink('detox-centers')}" class="text-blue-600 hover:text-blue-800 underline">medical detox</a> to <a href="${getTreatmentTypeLink('inpatient-rehab')}" class="text-blue-600 hover:text-blue-800 underline">inpatient rehab</a> to <a href="${getTreatmentTypeLink('outpatient-programs')}" class="text-blue-600 hover:text-blue-800 underline">outpatient programs</a>. The right level depends on the severity of addiction and your personal circumstances.
              </p>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">3. Location</h3>
              <p class="text-gray-700">
                Some people benefit from treatment close to home, while others find it helpful to be away from familiar environments. Explore <a href="${getStateLink('california')}" class="text-blue-600 hover:text-blue-800 underline">facilities in California</a>, <a href="${getStateLink('florida')}" class="text-blue-600 hover:text-blue-800 underline">Florida</a>, or your local area.
              </p>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">4. Specializations</h3>
              <p class="text-gray-700">
                Look for programs that specialize in your specific needs, whether that's <a href="${getTreatmentTypeLink('dual-diagnosis')}" class="text-blue-600 hover:text-blue-800 underline">dual diagnosis treatment</a>, gender-specific programs, or treatment for specific substances.
              </p>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">5. Insurance and Cost</h3>
              <p class="text-gray-700">
                Understanding your insurance coverage and the total cost of treatment is essential. Many facilities offer payment plans or sliding scale fees.
              </p>
            </div>
          </div>
        </div>

        <div class="bg-green-50 rounded-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-3">Questions to Ask</h2>
          <ul class="space-y-2 text-gray-700">
            <li>• What credentials and licenses does the facility hold?</li>
            <li>• What is the staff-to-patient ratio?</li>
            <li>• What does a typical day in treatment look like?</li>
            <li>• What aftercare support is provided?</li>
            <li>• How do you handle co-occurring mental health conditions?</li>
          </ul>
        </div>
      </section>
    </div>
  `,

  'what-to-expect-in-drug-rehab': `
    <div class="blog-content space-y-6">
      <p class="text-lg leading-relaxed text-gray-700">
        The decision to enter drug rehabilitation is a significant step toward recovery. Understanding what to expect can help ease anxiety and prepare you for the journey ahead. Here's a comprehensive look at what happens during treatment.
      </p>

      <section class="mt-8 space-y-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">The Treatment Process</h2>

          <div class="space-y-6">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Phase 1: Intake and Assessment</h3>
              <p class="text-gray-700">
                Upon arrival, you'll undergo a comprehensive assessment. Medical professionals will evaluate your physical health, substance use history, mental health, and personal circumstances to create a personalized treatment plan.
              </p>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Phase 2: Detoxification</h3>
              <p class="text-gray-700">
                If needed, <a href="${getTreatmentTypeLink('detox-centers')}" class="text-blue-600 hover:text-blue-800 underline">medical detox</a> helps your body safely clear substances. This phase is medically supervised to manage withdrawal symptoms and ensure your safety.
              </p>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Phase 3: Active Treatment</h3>
              <p class="text-gray-700">
                The core of rehabilitation includes individual therapy, group counseling, educational sessions, and skill-building activities. You'll learn coping strategies, identify triggers, and develop a plan for maintaining sobriety.
              </p>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Phase 4: Aftercare Planning</h3>
              <p class="text-gray-700">
                Before leaving, you'll work with counselors to develop a comprehensive aftercare plan that may include <a href="${getTreatmentTypeLink('sober-living')}" class="text-blue-600 hover:text-blue-800 underline">sober living</a>, outpatient therapy, and support group participation.
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">A Typical Day in Rehab</h2>
          <div class="space-y-3 text-gray-700">
            <p><strong>7:00 AM</strong> - Wake up, personal hygiene, breakfast</p>
            <p><strong>8:30 AM</strong> - Morning meditation or group exercise</p>
            <p><strong>9:00 AM</strong> - Individual therapy session</p>
            <p><strong>10:30 AM</strong> - Group therapy</p>
            <p><strong>12:00 PM</strong> - Lunch and free time</p>
            <p><strong>1:30 PM</strong> - Educational session or workshop</p>
            <p><strong>3:00 PM</strong> - Recreational activities</p>
            <p><strong>5:00 PM</strong> - Dinner</p>
            <p><strong>6:30 PM</strong> - Support group meeting or family therapy</p>
            <p><strong>8:00 PM</strong> - Personal time, journaling</p>
            <p><strong>10:00 PM</strong> - Lights out</p>
          </div>
        </div>
      </section>
    </div>
  `,

  'supporting-a-loved-one-through-addiction': `
    <div class="blog-content space-y-6">
      <p class="text-lg leading-relaxed text-gray-700">
        Watching someone you love struggle with addiction is heartbreaking. You may feel helpless, frustrated, or unsure of how to help. This guide offers practical strategies for supporting a loved one while also taking care of yourself.
      </p>

      <section class="mt-8 space-y-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">How to Help</h2>

          <div class="space-y-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Educate Yourself</h3>
              <p class="text-gray-700">
                Understanding addiction as a disease, not a moral failing, helps you approach your loved one with compassion rather than judgment.
              </p>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Communicate with Love</h3>
              <p class="text-gray-700">
                Express your concerns without criticism. Use "I" statements like "I'm worried about you" rather than "You're ruining your life."
              </p>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Set Healthy Boundaries</h3>
              <p class="text-gray-700">
                Loving someone doesn't mean enabling their addiction. Learn to say no to requests that support substance use.
              </p>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Encourage Professional Help</h3>
              <p class="text-gray-700">
                Help research <a href="/" class="text-blue-600 hover:text-blue-800 underline">treatment facilities</a> and offer to help with logistics like transportation or childcare.
              </p>
            </div>
          </div>
        </div>

        <div class="bg-yellow-50 rounded-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-3">Taking Care of Yourself</h2>
          <p class="text-gray-700 mb-4">
            Supporting someone with addiction can be exhausting. Remember to:
          </p>
          <ul class="space-y-2 text-gray-700">
            <li>• Attend support groups for families (Al-Anon, Nar-Anon)</li>
            <li>• Maintain your own physical and mental health</li>
            <li>• Seek your own therapy if needed</li>
            <li>• Accept that you cannot control their choices</li>
            <li>• Celebrate small victories</li>
          </ul>
        </div>
      </section>
    </div>
  `,

  'inpatient-vs-outpatient-rehab': `
    <div class="blog-content space-y-6">
      <p class="text-lg leading-relaxed text-gray-700">
        When considering addiction treatment, one of the first decisions you'll face is whether to pursue inpatient (residential) or outpatient care. Both have their benefits, and the right choice depends on your specific situation.
      </p>

      <section class="mt-8 space-y-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Inpatient Treatment</h2>
          <p class="text-gray-700 mb-4">
            <a href="${getTreatmentTypeLink('inpatient-rehab')}" class="text-blue-600 hover:text-blue-800 underline">Inpatient rehabilitation</a> involves living at the treatment facility for the duration of your program, typically 30 to 90 days.
          </p>

          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-green-50 rounded-lg p-4">
              <h3 class="font-semibold text-gray-900 mb-2">Pros</h3>
              <ul class="space-y-1 text-gray-700 text-sm">
                <li>• 24/7 support and supervision</li>
                <li>• Structured environment</li>
                <li>• Removal from triggers</li>
                <li>• Intensive therapy</li>
                <li>• Peer support community</li>
              </ul>
            </div>
            <div class="bg-red-50 rounded-lg p-4">
              <h3 class="font-semibold text-gray-900 mb-2">Cons</h3>
              <ul class="space-y-1 text-gray-700 text-sm">
                <li>• Higher cost</li>
                <li>• Time away from work/family</li>
                <li>• Less personal freedom</li>
                <li>• May feel isolating</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Outpatient Treatment</h2>
          <p class="text-gray-700 mb-4">
            <a href="${getTreatmentTypeLink('outpatient-programs')}" class="text-blue-600 hover:text-blue-800 underline">Outpatient programs</a> allow you to live at home while attending treatment sessions several times per week.
          </p>

          <div class="grid md:grid-cols-2 gap-4">
            <div class="bg-green-50 rounded-lg p-4">
              <h3 class="font-semibold text-gray-900 mb-2">Pros</h3>
              <ul class="space-y-1 text-gray-700 text-sm">
                <li>• More affordable</li>
                <li>• Maintain work/school</li>
                <li>• Stay with family</li>
                <li>• Practice skills in real life</li>
                <li>• Flexible scheduling</li>
              </ul>
            </div>
            <div class="bg-red-50 rounded-lg p-4">
              <h3 class="font-semibold text-gray-900 mb-2">Cons</h3>
              <ul class="space-y-1 text-gray-700 text-sm">
                <li>• More exposure to triggers</li>
                <li>• Less intensive support</li>
                <li>• Requires strong self-discipline</li>
                <li>• Home environment may be problematic</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="bg-blue-50 rounded-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-3">Making the Decision</h2>
          <p class="text-gray-700">
            Consider inpatient treatment if you have severe addiction, unsafe home environment, multiple failed attempts at outpatient treatment, or co-occurring mental health conditions. Outpatient may be appropriate for milder addictions, strong support systems, and work/family obligations that can't be interrupted.
          </p>
        </div>
      </section>
    </div>
  `,

  'insurance-coverage-for-addiction-treatment': `
    <div class="blog-content space-y-6">
      <p class="text-lg leading-relaxed text-gray-700">
        Understanding your insurance coverage for addiction treatment can be confusing, but it's an essential step in accessing care. Thanks to federal laws, most insurance plans are required to cover substance abuse treatment.
      </p>

      <section class="mt-8 space-y-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Your Rights Under the Law</h2>
          <p class="text-gray-700 mb-4">
            The Mental Health Parity and Addiction Equity Act requires insurance companies to cover mental health and substance abuse treatment at the same level as physical health care. The Affordable Care Act (ACA) further mandates coverage for addiction treatment as an essential health benefit.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">What Insurance Typically Covers</h2>
          <ul class="space-y-2 text-gray-700">
            <li class="flex items-start">
              <span class="text-green-600 mr-2">✓</span>
              <span><a href="${getTreatmentTypeLink('detox-centers')}" class="text-blue-600 hover:text-blue-800 underline">Medical detoxification</a></span>
            </li>
            <li class="flex items-start">
              <span class="text-green-600 mr-2">✓</span>
              <span><a href="${getTreatmentTypeLink('inpatient-rehab')}" class="text-blue-600 hover:text-blue-800 underline">Inpatient/residential treatment</a></span>
            </li>
            <li class="flex items-start">
              <span class="text-green-600 mr-2">✓</span>
              <span><a href="${getTreatmentTypeLink('outpatient-programs')}" class="text-blue-600 hover:text-blue-800 underline">Outpatient programs</a></span>
            </li>
            <li class="flex items-start">
              <span class="text-green-600 mr-2">✓</span>
              <span>Medication-assisted treatment (MAT)</span>
            </li>
            <li class="flex items-start">
              <span class="text-green-600 mr-2">✓</span>
              <span>Individual and group therapy</span>
            </li>
          </ul>
        </div>

        <div class="bg-yellow-50 rounded-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-3">Steps to Verify Coverage</h2>
          <ol class="space-y-2 text-gray-700">
            <li>1. Call the number on your insurance card</li>
            <li>2. Ask about coverage for substance abuse treatment</li>
            <li>3. Inquire about in-network vs. out-of-network benefits</li>
            <li>4. Understand your deductible and copays</li>
            <li>5. Ask about prior authorization requirements</li>
            <li>6. Get confirmation in writing</li>
          </ol>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">No Insurance? Options Available</h2>
          <p class="text-gray-700 mb-4">
            If you don't have insurance, you still have options:
          </p>
          <ul class="space-y-2 text-gray-700">
            <li>• State-funded treatment programs</li>
            <li>• Sliding scale payment plans</li>
            <li>• Scholarships from treatment centers</li>
            <li>• Medicaid coverage</li>
            <li>• SAMHSA treatment locator for free/low-cost options</li>
          </ul>
        </div>
      </section>
    </div>
  `,

  'opioid-addiction-treatment-options': `
    <div class="blog-content space-y-6">
      <p class="text-lg leading-relaxed text-gray-700">
        Opioid addiction has reached epidemic proportions in the United States, but effective treatments are available. Understanding your options is the first step toward recovery from opioid use disorder.
      </p>

      <section class="mt-8 space-y-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Medication-Assisted Treatment (MAT)</h2>
          <p class="text-gray-700 mb-4">
            MAT combines FDA-approved medications with counseling and behavioral therapies. It's considered the gold standard for treating opioid addiction.
          </p>

          <div class="space-y-4">
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="font-semibold text-gray-900 mb-2">Methadone</h3>
              <p class="text-gray-700 text-sm">
                A long-acting opioid that reduces cravings and withdrawal symptoms. Available only through certified clinics.
              </p>
            </div>
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="font-semibold text-gray-900 mb-2">Buprenorphine (Suboxone)</h3>
              <p class="text-gray-700 text-sm">
                A partial opioid agonist that can be prescribed by certified doctors. Reduces cravings with lower risk of misuse.
              </p>
            </div>
            <div class="bg-gray-50 rounded-lg p-4">
              <h3 class="font-semibold text-gray-900 mb-2">Naltrexone (Vivitrol)</h3>
              <p class="text-gray-700 text-sm">
                Blocks opioid effects completely. Available as a monthly injection for improved compliance.
              </p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Treatment Settings</h2>
          <p class="text-gray-700 mb-4">
            Opioid addiction treatment is available in various settings:
          </p>
          <ul class="space-y-2 text-gray-700">
            <li>• <a href="${getTreatmentTypeLink('detox-centers')}" class="text-blue-600 hover:text-blue-800 underline">Medical detox facilities</a> for safe withdrawal management</li>
            <li>• <a href="${getTreatmentTypeLink('inpatient-rehab')}" class="text-blue-600 hover:text-blue-800 underline">Residential treatment centers</a> for intensive care</li>
            <li>• <a href="${getTreatmentTypeLink('outpatient-programs')}" class="text-blue-600 hover:text-blue-800 underline">Outpatient programs</a> for ongoing support</li>
            <li>• Methadone clinics for daily dosing</li>
          </ul>
        </div>

        <div class="bg-red-50 rounded-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-3">Important Safety Information</h2>
          <p class="text-gray-700">
            Opioid withdrawal, while rarely life-threatening, can be extremely uncomfortable. Medical supervision during detox is recommended to ensure safety and improve comfort. Never attempt to detox alone from long-term or high-dose opioid use.
          </p>
        </div>
      </section>
    </div>
  `,

  'alcohol-detox-what-to-expect': `
    <div class="blog-content space-y-6">
      <p class="text-lg leading-relaxed text-gray-700">
        Alcohol withdrawal can be medically serious, making professional detox essential for anyone who has been drinking heavily. Understanding the process can help you prepare for this important first step in recovery.
      </p>

      <section class="mt-8 space-y-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">The Alcohol Withdrawal Timeline</h2>

          <div class="space-y-4">
            <div class="border-l-4 border-yellow-400 pl-4">
              <h3 class="font-semibold text-gray-900">6-12 Hours</h3>
              <p class="text-gray-700 text-sm">Anxiety, insomnia, nausea, tremors begin</p>
            </div>
            <div class="border-l-4 border-orange-400 pl-4">
              <h3 class="font-semibold text-gray-900">12-48 Hours</h3>
              <p class="text-gray-700 text-sm">Peak symptoms: high blood pressure, rapid heartbeat, confusion, fever</p>
            </div>
            <div class="border-l-4 border-red-400 pl-4">
              <h3 class="font-semibold text-gray-900">48-72 Hours</h3>
              <p class="text-gray-700 text-sm">Risk of delirium tremens (DTs) for severe cases - medical emergency</p>
            </div>
            <div class="border-l-4 border-green-400 pl-4">
              <h3 class="font-semibold text-gray-900">5-7 Days</h3>
              <p class="text-gray-700 text-sm">Symptoms begin to subside for most people</p>
            </div>
          </div>
        </div>

        <div class="bg-red-50 rounded-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-3">Why Medical Detox is Important</h2>
          <p class="text-gray-700 mb-4">
            Unlike many other substances, alcohol withdrawal can be life-threatening. Complications can include:
          </p>
          <ul class="space-y-2 text-gray-700">
            <li>• Seizures</li>
            <li>• Delirium tremens (DTs)</li>
            <li>• Severe dehydration</li>
            <li>• Heart complications</li>
          </ul>
          <p class="text-gray-700 mt-4">
            <a href="${getTreatmentTypeLink('detox-centers')}" class="text-blue-600 hover:text-blue-800 underline">Medical detox facilities</a> provide 24/7 monitoring and medications to ensure safety and comfort.
          </p>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">What Happens During Medical Detox</h2>
          <ul class="space-y-2 text-gray-700">
            <li>• Comprehensive medical assessment</li>
            <li>• Vital sign monitoring around the clock</li>
            <li>• Medications to prevent seizures and reduce symptoms</li>
            <li>• IV fluids and nutritional support</li>
            <li>• Emotional support and counseling</li>
            <li>• Planning for ongoing treatment</li>
          </ul>
        </div>
      </section>
    </div>
  `,

  'dual-diagnosis-treatment-explained': `
    <div class="blog-content space-y-6">
      <p class="text-lg leading-relaxed text-gray-700">
        Many people struggling with addiction also have a co-occurring mental health condition. This is called dual diagnosis, and treating both conditions simultaneously is crucial for successful recovery.
      </p>

      <section class="mt-8 space-y-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Understanding Dual Diagnosis</h2>
          <p class="text-gray-700 mb-4">
            Common mental health conditions that co-occur with addiction include:
          </p>
          <ul class="space-y-2 text-gray-700">
            <li>• Depression</li>
            <li>• Anxiety disorders</li>
            <li>• Bipolar disorder</li>
            <li>• Post-traumatic stress disorder (PTSD)</li>
            <li>• Attention-deficit/hyperactivity disorder (ADHD)</li>
            <li>• Personality disorders</li>
          </ul>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Why Integrated Treatment Matters</h2>
          <p class="text-gray-700 mb-4">
            When mental health and addiction are treated separately, outcomes suffer. That's because:
          </p>
          <ul class="space-y-2 text-gray-700">
            <li>• Mental health symptoms can trigger relapse</li>
            <li>• Substance use can worsen mental health conditions</li>
            <li>• The conditions often share root causes</li>
            <li>• Medications need to be carefully coordinated</li>
          </ul>
          <p class="text-gray-700 mt-4">
            <a href="${getTreatmentTypeLink('dual-diagnosis')}" class="text-blue-600 hover:text-blue-800 underline">Dual diagnosis treatment programs</a> address both conditions with a coordinated approach.
          </p>
        </div>

        <div class="bg-blue-50 rounded-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-3">What to Look for in Dual Diagnosis Treatment</h2>
          <ul class="space-y-2 text-gray-700">
            <li>• Licensed mental health professionals on staff</li>
            <li>• Psychiatric medication management</li>
            <li>• Evidence-based therapies (CBT, DBT, trauma therapy)</li>
            <li>• Integrated treatment planning</li>
            <li>• Continuing care for both conditions</li>
          </ul>
        </div>
      </section>
    </div>
  `,

  'relapse-prevention-strategies': `
    <div class="blog-content space-y-6">
      <p class="text-lg leading-relaxed text-gray-700">
        Recovery from addiction is a lifelong journey, and relapse is a common part of that journey for many people. Understanding how to prevent relapse and respond if it happens is essential for long-term success.
      </p>

      <section class="mt-8 space-y-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Understanding Relapse</h2>
          <p class="text-gray-700 mb-4">
            Relapse typically happens in three stages:
          </p>
          <div class="space-y-4">
            <div class="bg-yellow-50 rounded-lg p-4">
              <h3 class="font-semibold text-gray-900">Emotional Relapse</h3>
              <p class="text-gray-700 text-sm">Not thinking about using, but emotions and behaviors set up future relapse (isolation, poor self-care, bottling emotions)</p>
            </div>
            <div class="bg-orange-50 rounded-lg p-4">
              <h3 class="font-semibold text-gray-900">Mental Relapse</h3>
              <p class="text-gray-700 text-sm">Internal struggle between wanting to use and wanting to stay sober (romanticizing past use, lying, planning relapse)</p>
            </div>
            <div class="bg-red-50 rounded-lg p-4">
              <h3 class="font-semibold text-gray-900">Physical Relapse</h3>
              <p class="text-gray-700 text-sm">Actually using substances</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-4">Prevention Strategies</h2>
          <ul class="space-y-3 text-gray-700">
            <li class="flex items-start">
              <span class="text-green-600 mr-2 mt-1">1.</span>
              <span><strong>Know your triggers</strong> - Identify people, places, and situations that increase cravings</span>
            </li>
            <li class="flex items-start">
              <span class="text-green-600 mr-2 mt-1">2.</span>
              <span><strong>Build a support network</strong> - Stay connected with sober friends, sponsors, and support groups</span>
            </li>
            <li class="flex items-start">
              <span class="text-green-600 mr-2 mt-1">3.</span>
              <span><strong>Practice self-care</strong> - Prioritize sleep, nutrition, and exercise</span>
            </li>
            <li class="flex items-start">
              <span class="text-green-600 mr-2 mt-1">4.</span>
              <span><strong>Continue therapy</strong> - Ongoing counseling helps maintain progress</span>
            </li>
            <li class="flex items-start">
              <span class="text-green-600 mr-2 mt-1">5.</span>
              <span><strong>Have a plan</strong> - Know what to do if cravings become intense</span>
            </li>
          </ul>
        </div>

        <div class="bg-green-50 rounded-lg p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-3">If Relapse Happens</h2>
          <p class="text-gray-700 mb-4">
            Relapse doesn't mean failure. It's an opportunity to learn and strengthen your recovery:
          </p>
          <ul class="space-y-2 text-gray-700">
            <li>• Reach out for help immediately</li>
            <li>• Don't let shame keep you silent</li>
            <li>• Analyze what led to the relapse</li>
            <li>• Adjust your treatment plan as needed</li>
            <li>• Consider returning to <a href="/" class="text-blue-600 hover:text-blue-800 underline">treatment</a> if necessary</li>
          </ul>
        </div>
      </section>
    </div>
  `,
};

export function getBlogContent(slug: string): string | undefined {
  return blogContent[slug];
}
