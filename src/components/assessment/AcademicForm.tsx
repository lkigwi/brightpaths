import { useAssessment } from '@/context/AssessmentContext';
import { academicSubjects } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowLeft, BookOpen } from 'lucide-react';

export function AcademicForm() {
  const { academicScores, updateAcademicScore, setCurrentStep, studentName, setStudentName } = useAssessment();

  const handleScoreChange = (
    subject: string, 
    grade: 'grade7' | 'grade8' | 'grade9', 
    value: string
  ) => {
    const score = Math.min(100, Math.max(0, parseInt(value) || 0));
    updateAcademicScore(subject, grade, score);
  };

  const isComplete = () => {
    if (!studentName.trim()) return false;
    return academicSubjects.every(subject => {
      const scores = academicScores[subject.name];
      return scores?.grade7 > 0 && scores?.grade8 > 0 && scores?.grade9 > 0;
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-stem-light rounded-2xl flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8 text-stem" />
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
          Academic Performance
        </h2>
        <p className="text-muted-foreground">
          Enter your Junior School grades (out of 100) for each subject across Grades 7, 8, and 9.
        </p>
      </div>

      {/* Student Name */}
      <div className="mb-8">
        <Label htmlFor="studentName" className="text-base font-semibold mb-2 block">
          Your Name
        </Label>
        <Input
          id="studentName"
          placeholder="Enter your full name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Grade Input Table */}
      <div className="bg-card rounded-2xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted">
                <th className="text-left p-4 font-semibold">Subject</th>
                <th className="text-center p-4 font-semibold">Grade 7</th>
                <th className="text-center p-4 font-semibold">Grade 8</th>
                <th className="text-center p-4 font-semibold">Grade 9</th>
              </tr>
            </thead>
            <tbody>
              {academicSubjects.map((subject, index) => (
                <tr 
                  key={subject.name}
                  className={index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span 
                        className={`w-2 h-2 rounded-full ${
                          subject.pathway === 'STEM' ? 'bg-stem' :
                          subject.pathway === 'Social Sciences' ? 'bg-social' :
                          'bg-arts'
                        }`}
                      />
                      <span className="font-medium">{subject.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="0-100"
                      className="w-20 mx-auto text-center"
                      value={academicScores[subject.name]?.grade7 || ''}
                      onChange={(e) => handleScoreChange(subject.name, 'grade7', e.target.value)}
                    />
                  </td>
                  <td className="p-4">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="0-100"
                      className="w-20 mx-auto text-center"
                      value={academicScores[subject.name]?.grade8 || ''}
                      onChange={(e) => handleScoreChange(subject.name, 'grade8', e.target.value)}
                    />
                  </td>
                  <td className="p-4">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      placeholder="0-100"
                      className="w-20 mx-auto text-center"
                      value={academicScores[subject.name]?.grade9 || ''}
                      onChange={(e) => handleScoreChange(subject.name, 'grade9', e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button 
          variant="ghost" 
          onClick={() => setCurrentStep(0)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <Button 
          onClick={() => setCurrentStep(2)}
          disabled={!isComplete()}
        >
          Continue to Quiz
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}
